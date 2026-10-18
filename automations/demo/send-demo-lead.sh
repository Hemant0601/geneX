#!/usr/bin/env bash
# send-demo-lead.sh: fire fictional DEMO payloads at your n8n webhooks.
#
# Every business and person in these payloads is invented (DEMO – fictional business).
# The only real value is DEMO_TEST_NUMBER: your own test phone, which must also be in the
# workflow's allowed_recipients list (DEMO_TEST_NUMBERS) and, on Meta's test number,
# in the WhatsApp "To" recipient list.
#
# Usage:
#   export N8N_URL=https://n8n.askhemant.ai        # default http://localhost:5678
#   export DEMO_TEST_NUMBER=+9198XXXXXXXX          # your own phone, E.164
#   ./send-demo-lead.sh skyline-form               # 02: website-form lead → first reply
#   ./send-demo-lead.sh skyline-meta               # 02: Meta lead-ads lead (Hinglish template)
#   ./send-demo-lead.sh whatsapp "2BHK in Baner"   # 03: simulate an inbound WhatsApp message
#   ./send-demo-lead.sh verify                     # 03: simulate Meta's GET verification
#   ./send-demo-lead.sh missed-call [generic|twilio|exotel|knowlarity]   # 04
#   ./send-demo-lead.sh kit-signup                 # 01: Tally kit sign-up (test data)
#   ./send-demo-lead.sh calcom-created [HOURS]     # 06: Fit Call booked HOURS from now (default 26)
#   ./send-demo-lead.sh calcom-cancelled UID       # 06: cancel that booking uid
#
# Optional environment:
#   N8N_WEBHOOK_PATH=webhook-test   use the editor's test URLs ("Listen for test event")
#   DEMO_WEBHOOK_KEY=...            sent as x-demo-key (workflows 02 and 04 check it if it is set in n8n)
#   TALLY_SIGNING_SECRET=...        signs kit-signup the way Tally does (Tally-Signature)
#   CALCOM_WEBHOOK_SECRET=...       signs calcom-* the way Cal.com does (X-Cal-Signature-256)
#   WA_APP_SECRET=...               signs whatsapp the way Meta does (X-Hub-Signature-256)
#   WA_VERIFY_TOKEN=...             used by "verify"
#   DEMO_WA_PHONE_NUMBER_ID=...     phone_number_id put in simulated inbound messages
#
# Needs bash, curl and openssl (openssl only for signing).

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
N8N_URL="${N8N_URL:-http://localhost:5678}"
N8N_URL="${N8N_URL%/}"
HOOK="${N8N_WEBHOOK_PATH:-webhook}"
CMD="${1:-help}"

die() { echo "error: $*" >&2; exit 1; }
need_number() {
  [[ -n "${DEMO_TEST_NUMBER:-}" ]] || die "set DEMO_TEST_NUMBER to your own test phone, e.g. export DEMO_TEST_NUMBER=+9198XXXXXXXX"
  [[ "$DEMO_TEST_NUMBER" =~ ^\+[1-9][0-9]{7,14}$ ]] || die "DEMO_TEST_NUMBER must be E.164, like +9198XXXXXXXX"
}
iso_at() { # $1 = epoch seconds → ISO 8601 UTC (GNU or BSD date)
  date -u -d "@$1" +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -r "$1" +%Y-%m-%dT%H:%M:%SZ
}
sed_escape() { printf '%s' "$1" | sed -e 's/[\\&|]/\\&/g'; }
json_escape() { printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'; }

NOW_EPOCH="$(date -u +%s)"
MSG_ID="$(date -u +%Y%m%d%H%M%S)$RANDOM"
TMP_BODY="$(mktemp)"; TMP_RESP="$(mktemp)"
trap 'rm -f "$TMP_BODY" "$TMP_RESP"' EXIT

fill() { # $1 = template file → $TMP_BODY with every __TOKEN__ replaced
  local digits="${DEMO_TEST_NUMBER#+}"
  local start=$((NOW_EPOCH + ${HOURS:-26} * 3600))
  sed -e "s|__TEST_NUMBER__|$(sed_escape "${DEMO_TEST_NUMBER:-}")|g" \
      -e "s|__TEST_NUMBER_URLENC__|%2B${digits}|g" \
      -e "s|__TEST_NUMBER_10__|${digits: -10}|g" \
      -e "s|__TEST_WA_ID__|${digits}|g" \
      -e "s|__NOW__|$(iso_at "$NOW_EPOCH")|g" \
      -e "s|__UNIX__|${NOW_EPOCH}|g" \
      -e "s|__START__|$(iso_at "$start")|g" \
      -e "s|__END__|$(iso_at $((start + 1200)))|g" \
      -e "s|__MSG_ID__|${MSG_ID}|g" \
      -e "s|__PHONE_NUMBER_ID__|$(sed_escape "${DEMO_WA_PHONE_NUMBER_ID:-DEMO_PHONE_NUMBER_ID}")|g" \
      -e "s|__TEXT__|$(sed_escape "$(json_escape "${TEXT:-}")")|g" \
      "$1" > "$TMP_BODY"
}
hmac_hex() { openssl dgst -sha256 -hmac "$1" < "$TMP_BODY" | sed 's/^.* //'; }
hmac_b64() { openssl dgst -sha256 -hmac "$1" -binary < "$TMP_BODY" | base64; }

post() { # $1 = path, $2 = content type, rest = extra curl args
  local path="$1" ctype="$2"; shift 2
  local url="$N8N_URL/$HOOK/$path"
  echo "POST $url"
  local out
  out="$(curl -sS -o "$TMP_RESP" -w '%{http_code} %{time_total}' -X POST \
    -H "Content-Type: $ctype" ${DEMO_WEBHOOK_KEY:+-H "x-demo-key: $DEMO_WEBHOOK_KEY"} "$@" \
    --data-binary @"$TMP_BODY" "$url")" || die "request failed (is n8n running and the workflow active?)"
  echo "HTTP ${out% *} in ${out#* } s"
  cat "$TMP_RESP"; echo
}

case "$CMD" in
  skyline-form)
    need_number; fill "$HERE/skyline-website-form-lead.json"
    echo "DEMO – fictional business: Skyline Realty website-form lead. Start your stopwatch now."
    post demo/skyline/lead application/json ;;
  skyline-meta)
    need_number; fill "$HERE/skyline-meta-lead-ads-relay.json"
    echo "DEMO – fictional business: Skyline Realty Meta lead-ads lead (Hinglish)."
    post demo/skyline/lead application/json ;;
  whatsapp)
    need_number; TEXT="${2:-Yes, ask me}"; fill "$HERE/skyline-whatsapp-inbound-text.json"
    args=()
    if [[ -n "${WA_APP_SECRET:-}" ]]; then args=(-H "X-Hub-Signature-256: sha256=$(hmac_hex "$WA_APP_SECRET")"); fi
    [[ -n "${DEMO_WA_PHONE_NUMBER_ID:-}" ]] || echo "warning: DEMO_WA_PHONE_NUMBER_ID is not set; workflow 03 ignores messages addressed to other phone numbers" >&2
    echo "DEMO – simulated inbound WhatsApp message: \"$TEXT\""
    post demo/whatsapp/inbound application/json "${args[@]+"${args[@]}"}" ;;
  verify)
    url="$N8N_URL/$HOOK/demo/whatsapp/inbound?hub.mode=subscribe&hub.verify_token=${WA_VERIFY_TOKEN:-wrong-token}&hub.challenge=1158201444"
    echo "GET $url"
    curl -sS -w '\nHTTP %{http_code}\n' "$url"
    echo "(expect 1158201444 and HTTP 200 when WA_VERIFY_TOKEN matches n8n)" ;;
  missed-call)
    need_number; kind="${2:-generic}"
    case "$kind" in
      generic)    fill "$HERE/smilecare-missed-call-generic.json"; post demo/smilecare/missed-call application/json ;;
      knowlarity) fill "$HERE/smilecare-missed-call-knowlarity.json"; post demo/smilecare/missed-call application/json ;;
      twilio)     fill "$HERE/smilecare-missed-call-twilio.form"; post demo/smilecare/missed-call application/x-www-form-urlencoded ;;
      exotel)
        fill "$HERE/smilecare-missed-call-exotel.query"
        url="$N8N_URL/$HOOK/demo/smilecare/missed-call?$(tr -d '\n' < "$TMP_BODY")${DEMO_WEBHOOK_KEY:+&key=$DEMO_WEBHOOK_KEY}"
        echo "GET $url"; curl -sS -w '\nHTTP %{http_code} in %{time_total} s\n' "$url" ;;
      *) die "missed-call kind must be generic, twilio, exotel or knowlarity" ;;
    esac
    echo "DEMO – fictional business: SmileCare Dental missed call ($kind)." ;;
  kit-signup)
    need_number; fill "$HERE/tally-kit-signup.json"
    args=()
    if [[ -n "${TALLY_SIGNING_SECRET:-}" ]]; then args=(-H "Tally-Signature: $(hmac_b64 "$TALLY_SIGNING_SECRET")"); fi
    echo "Test kit sign-up (test data, writes a row to your real Pipeline sheet: delete it afterwards)."
    post askhemant/kit-signup application/json "${args[@]+"${args[@]}"}" ;;
  calcom-created|calcom-cancelled)
    need_number
    if [[ "$CMD" == calcom-created ]]; then HOURS="${2:-26}"; fill "$HERE/calcom-booking-created.json"
    else
      [[ -n "${2:-}" ]] || die "give the booking uid to cancel (printed by calcom-created)"
      fill "$HERE/calcom-booking-cancelled.json"; sed -i.bak "s|demo-booking-${MSG_ID}|$(sed_escape "$2")|g" "$TMP_BODY"; rm -f "$TMP_BODY.bak"
    fi
    args=()
    if [[ -n "${CALCOM_WEBHOOK_SECRET:-}" ]]; then args=(-H "X-Cal-Signature-256: $(hmac_hex "$CALCOM_WEBHOOK_SECRET")"); fi
    [[ "$CMD" == calcom-created ]] && echo "Test booking uid: demo-booking-${MSG_ID} (use it with calcom-cancelled)"
    post askhemant/calcom application/json "${args[@]+"${args[@]}"}" ;;
  help|-h|--help|*)
    sed -n '2,32p' "$0" | sed 's/^# \{0,1\}//' ;;
esac
