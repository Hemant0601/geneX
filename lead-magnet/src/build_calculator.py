#!/usr/bin/env python3
"""Builds lead-magnet/lead-leak-calculator.xlsx (the Lead Leak Calculator bonus).

Three sheets: "How to use", "Your numbers" (yellow input cells) and "Results" (formulas only).
Formulas use plain arithmetic, IF, IFERROR, AND, OR and MAX, so they recalculate the same way in
Google Sheets, Excel and LibreOffice. No macros, no named ranges, no Excel-only functions.

Run:  python3 lead-magnet/src/build_calculator.py
Then: python3 lead-magnet/src/verify_calculator.py   (recomputes every result independently)
"""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parent.parent / "lead-leak-calculator.xlsx"

# Brand colours (brand/tokens.css). Amber is never used as text on light cells.
INDIGO, INK, PAPER, SLATE, MIST = "4338CA", "0B1020", "F7F5F0", "5B5F73", "E8E6F7"
LEAK_RED, GREEN, WHITE = "B42318", "15803D", "FFFFFF"
INPUT_YELLOW = "FFF2B3"

FONT = "Arial"
f_title = Font(name=FONT, size=18, bold=True, color=WHITE)
f_sub = Font(name=FONT, size=11, color="E8E6F7")
f_head = Font(name=FONT, size=11, bold=True, color=WHITE)
f_sec = Font(name=FONT, size=12, bold=True, color=INDIGO)
f_body = Font(name=FONT, size=11, color=INK)
f_bold = Font(name=FONT, size=11, bold=True, color=INK)
f_key = Font(name=FONT, size=13, bold=True, color=INDIGO)
f_note = Font(name=FONT, size=10, color=SLATE)
f_warn = Font(name=FONT, size=11, bold=True, color=LEAK_RED)

fill = lambda c: PatternFill("solid", start_color=c, end_color=c)
thin = Side(style="thin", color="D9D6E8")
box = Border(left=thin, right=thin, top=thin, bottom=thin)
wrap = Alignment(wrap_text=True, vertical="center")
wrap_top = Alignment(wrap_text=True, vertical="top")
center = Alignment(horizontal="center", vertical="center")
right = Alignment(horizontal="right", vertical="center")

PCT, INT, DEC1, MONEY = "0%", "#,##0", "#,##0.0", "#,##0"

# ---------------------------------------------------------------- inputs
# (row label, example value, number format, guide text, validation kind)
INPUTS = [
    ("Enquiries per month, all sources", 120, INT,
     "Count last month: portal alerts, Meta leads, Instagram DMs, WhatsApp chats, calls.", "count"),
    ("Share that arrive after hours (e.g. after 8 pm, before 9 am, Sundays)", 0.30, PCT,
     "Check the timestamps on last month's enquiries.", "pct"),
    ("Of those after-hours enquiries: share first answered next day or later", 0.80, PCT,
     "Your 10 pm self-test (kit page 11) is a good first measure.", "pct"),
    ("Of daytime enquiries: share first answered after more than 1 hour", 0.30, PCT,
     "Think of site-visit days, drives and meetings.", "pct"),
    ("Share of enquiries never followed up after day 2", 0.50, PCT,
     "Scroll your WhatsApp: how many chats stop after one call?", "pct"),
    ("Share of enquiries that book a site visit (or appointment)", 0.10, PCT,
     "Visits booked last month / enquiries last month.", "pct"),
    ("Share of booked visits that don't show up", 0.20, PCT,
     "No-shows / visits booked.", "pct"),
    ("Current close rate: share of enquiries that become a deal", 0.02, PCT,
     "Deals closed in the last 6 months / enquiries in the same 6 months.", "pct"),
    ("Average deal value, or your commission per deal", 150000, MONEY,
     "Brokers: use your commission, not the property price.", "money"),
    ("Hours lost per no-show (travel + waiting)", 2, DEC1,
     "Your time, round trip.", "count"),
    ("YOUR GUESS: share of at-risk deals you could win back with faster, steadier follow-up", None, PCT,
     "Left blank on purpose. Only you can guess this; start low. Nobody can promise it.", "pct"),
    ("Optional: one-off cost of a fix you're considering", None, MONEY,
     "Leave blank if none. Used only for the break-even lines.", "money"),
    ("Currency label", "₹", "@",
     "Type $ or AED if you prefer. It only changes the labels.", "text"),
]
FIRST_INPUT_ROW = 6
R = {i + 1: FIRST_INPUT_ROW + i for i in range(len(INPUTS))}  # input number -> row
ref = lambda n: f"'Your numbers'!$C${R[n]}"
RESULT_ROWS = {}  # result key -> row on the Results sheet (filled by build())
N, AH, AHL, DL, NF, VR, NS, CR, DV, HRS, WB, COST, CUR = (ref(i) for i in range(1, 14))


def build():
    wb = Workbook()

    # ============================================================ How to use
    hw = wb.active
    hw.title = "How to use"
    hw.sheet_view.showGridLines = False
    hw.column_dimensions["A"].width = 4
    hw.column_dimensions["B"].width = 100
    hw.row_dimensions[1].height = 40
    for c in ("A", "B"):
        hw[f"{c}1"].fill = fill(INK)
        hw[f"{c}2"].fill = fill(INK)
    hw["B1"] = "Lead Leak Calculator"
    hw["B1"].font = f_title
    hw["B1"].alignment = Alignment(vertical="center")
    hw["B2"] = "Bonus to The Lead Leak Kit, by Hemant Kumar · askhemant.ai · @askhemant"
    hw["B2"].font = f_sub
    lines = [
        ("h", "What it does"),
        ("p", "It turns your own numbers into an estimate of how many enquiries pass through a leak each month "
              "(late reply, no follow-up, no-shows) and what those enquiries are worth at your own close rate."),
        ("k", "Your numbers, your estimate. Not a promise, not a forecast. AskHemant supplies no ROI figures."),
        ("h", "How to use it (5 minutes)"),
        ("p", "1. Open the \"Your numbers\" tab. Change only the yellow cells. The numbers already there are "
              "examples to show how it works, not benchmarks. Type percentages with the % sign (30%)."),
        ("p", "2. Not sure of a number? Count last month's enquiries in your phone, inbox and portal dashboards. "
              "For reply speed, do the 10 pm self-test (kit page 11)."),
        ("p", "3. Open \"Results\". Check \"Revenue per month now\" first. If it doesn't match your real income, "
              "fix your close rate or deal value before reading anything else."),
        ("p", "4. The win-back lines stay empty until you type YOUR guess in yellow input 11. Start low."),
        ("p", "5. Want a second opinion on your numbers? Book a free 20-min Fit Call at askhemant.ai/book."),
        ("h", "Using it in Google Sheets"),
        ("p", "Make your own copy first (File > Make a copy) so your numbers stay private. Everything "
              "recalculates as you type. Nothing is sent to AskHemant."),
        ("h", "Assumptions (also on the Results tab)"),
        ("p", "\"At risk\" means an enquiry hit at least one leak. It does not mean it was lost."),
        ("p", "A late reply and no follow-up are treated as independent leaks, so an enquiry hit by both is counted once."),
        ("p", "Money at risk applies your current close rate to every enquiry. Fast-answered leads may close better "
              "or worse than that; you know your business."),
        ("p", "All amounts are before tax, in the currency label you choose."),
        ("n", "v1 · October 2026 · General guidance, not financial advice."),
    ]
    row = 4
    for kind, text in lines:
        cell = hw.cell(row=row, column=2, value=text)
        if kind == "h":
            cell.font = f_sec
            hw.row_dimensions[row].height = 26
            row += 0
        elif kind == "k":
            cell.font = f_warn
        elif kind == "n":
            cell.font = f_note
        else:
            cell.font = f_body
        cell.alignment = wrap
        if kind == "p" and len(text) > 95:
            hw.row_dimensions[row].height = 30
        row += 1 if kind != "h" else 1
        if kind in ("k",):
            row += 1

    # ============================================================ Your numbers
    ws = wb.create_sheet("Your numbers")
    ws.sheet_view.showGridLines = False
    widths = {"A": 5, "B": 62, "C": 16, "D": 62}
    for c, w in widths.items():
        ws.column_dimensions[c].width = w
    for r_ in (1, 2):
        for c in "ABCD":
            ws[f"{c}{r_}"].fill = fill(INK)
    ws.row_dimensions[1].height = 36
    ws["B1"] = "Your numbers"
    ws["B1"].font = f_title
    ws["B1"].alignment = Alignment(vertical="center")
    ws["B2"] = "Change the yellow cells only. Your numbers, your estimate. Not a promise."
    ws["B2"].font = f_sub
    ws["B3"] = "The values below are EXAMPLES. Replace every one with your own."
    ws["B3"].font = f_warn
    heads = ["#", "Your number", "Value", "How to find it"]
    for i, h in enumerate(heads):
        c = ws.cell(row=5, column=i + 1, value=h)
        c.font, c.fill, c.alignment, c.border = f_head, fill(INDIGO), center if i in (0, 2) else wrap, box
    ws.row_dimensions[5].height = 22

    dv_pct = DataValidation(type="decimal", operator="between", formula1="0", formula2="1", allow_blank=True,
                            showErrorMessage=True, errorTitle="Percentage",
                            error="Enter a percentage between 0% and 100%.")
    dv_num = DataValidation(type="decimal", operator="greaterThanOrEqual", formula1="0", allow_blank=True,
                            showErrorMessage=True, errorTitle="Number", error="Enter a number of 0 or more.")
    ws.add_data_validation(dv_pct)
    ws.add_data_validation(dv_num)

    for i, (label, value, fmt, guide, kind) in enumerate(INPUTS, start=1):
        r_ = R[i]
        a = ws.cell(row=r_, column=1, value=i)
        b = ws.cell(row=r_, column=2, value=label)
        c = ws.cell(row=r_, column=3, value=value)
        d = ws.cell(row=r_, column=4, value=guide)
        a.font, a.alignment = f_note, center
        b.font, b.alignment = (f_bold if i == 11 else f_body), wrap
        c.font, c.fill, c.number_format, c.alignment = f_bold, fill(INPUT_YELLOW), fmt, right
        d.font, d.alignment = f_note, wrap
        for cell in (a, b, c, d):
            cell.border = box
        ws.row_dimensions[r_].height = 34
        if kind == "pct":
            dv_pct.add(c.coordinate)
        elif kind in ("count", "money"):
            dv_num.add(c.coordinate)
    ws.freeze_panes = "A6"
    last = R[len(INPUTS)]
    ws.cell(row=last + 2, column=2, value="Next: open the Results tab.").font = f_sec

    # ============================================================ Results
    rs = wb.create_sheet("Results")
    rs.sheet_view.showGridLines = False
    for c, w in {"A": 5, "B": 58, "C": 20, "D": 9, "E": 64}.items():
        rs.column_dimensions[c].width = w
    for r_ in (1, 2):
        for c in "ABCDE":
            rs[f"{c}{r_}"].fill = fill(INK)
    rs.row_dimensions[1].height = 36
    rs["B1"] = "Results"
    rs["B1"].font = f_title
    rs["B1"].alignment = Alignment(vertical="center")
    rs["B2"] = "Your numbers, your estimate. Not a promise."
    rs["B2"].font = f_sub
    # banner: warns while the example numbers are still in place
    ex = INPUTS
    cond = ",".join([
        f"{N}={ex[0][1]}", f"{AH}={ex[1][1]}", f"{AHL}={ex[2][1]}", f"{DL}={ex[3][1]}", f"{NF}={ex[4][1]}",
        f"{VR}={ex[5][1]}", f"{NS}={ex[6][1]}", f"{CR}={ex[7][1]}", f"{DV}={ex[8][1]}",
    ])
    rs["B3"] = (f'=IF(AND({cond}),"These are still the EXAMPLE numbers. Change the yellow cells on Your numbers.",'
                f'"Based on your numbers.")')
    rs["B3"].font = f_warn

    # Each row: (key, label, formula, number format, unit, explanation, style).
    # Formulas refer to other result rows as {key}; they are resolved to C<row> after layout.
    rows = []

    def sec(title):
        rows.append(("__sec__", title))

    sec("A. Where your enquiries leak (per month)")
    rows += [
        ("n", "Enquiries per month", f"={N}", INT, "", "Input 1", None),
        ("ah", "After-hours enquiries", f"={N}*{AH}", DEC1, "", "1 × 2", None),
        ("ahl", "…first answered next day or later", f"={N}*{AH}*{AHL}", DEC1, "", "1 × 2 × 3", None),
        ("dl", "Daytime enquiries answered after more than 1 hour", f"={N}*(1-{AH})*{DL}", DEC1, "",
         "1 × (100% − 2) × 4", None),
        ("late", "Total enquiries answered late", "={ahl}+{dl}", DEC1, "", "The two lines above", "bold"),
        ("latepct", "Share answered late", "=IFERROR({late}/{n},0)", PCT, "", "Late ÷ all enquiries", None),
        ("nf", "Never followed up after day 2", f"={N}*{NF}", DEC1, "", "1 × 5", None),
        ("risk", "Enquiries at risk (late reply, no follow-up, or both)", f"={N}*(1-(1-{{latepct}})*(1-{NF}))",
         DEC1, "", "1 × [100% − (100% − late share) × (100% − 5)]. Counted once if hit by both.", "key"),
        ("ns", "Booked visits that don't show up", f"={N}*{VR}*{NS}", DEC1, "", "1 × 6 × 7", None),
        ("hrs", "Hours lost to no-shows", f"={{ns}}*{HRS}", DEC1, "hrs", "No-shows × 10", None),
    ]
    sec("B. What that's worth, at your own close rate")
    rows += [
        ("deals", "Deals per month now", f"={N}*{CR}", "#,##0.00", "", "1 × 8", None),
        ("rev", "Revenue per month now (check: does this match reality?)", f"={{deals}}*{DV}", MONEY, "cur",
         "Deals × 9. If this is far from your real income, adjust 8 or 9 first.", "bold"),
        ("rdeals", "Deals that pass through a leak each month", f"={{risk}}*{CR}", "#,##0.00", "",
         "At-risk enquiries × 8", None),
        ("rrev", "Revenue at risk per month", f"={{rdeals}}*{DV}", MONEY, "cur", "Deals through a leak × 9", "key"),
        ("rrevy", "Revenue at risk per year", "={rrev}*12", MONEY, "cur", "× 12", "key"),
    ]
    sec("C. Your what-if (uses YOUR guess, input 11)")
    rows += [
        ("wdeals", "Deals won back per month, if your guess holds",
         f'=IF({WB}="","Enter input 11 first",{{rdeals}}*{WB})', "#,##0.00", "", "Deals through a leak × 11", None),
        ("wrev", "Revenue won back per month, if your guess holds",
         f'=IF({WB}="","—",{{wdeals}}*{DV})', MONEY, "cur", "Deals won back × 9", "bold"),
        ("wrevy", "Revenue won back per year, if your guess holds",
         f'=IF({WB}="","—",{{wrev}}*12)', MONEY, "cur", "× 12", "bold"),
        ("be", "Extra deals that would cover the fix cost",
         f'=IF(OR({COST}="",{DV}=0),"—",{COST}/{DV})', "#,##0.00", "", "12 ÷ 9 (break-even, no guess needed)", None),
        ("bem", "Months to cover the fix cost, if your guess holds",
         f'=IF(OR({COST}="",{WB}="",{WB}=0,{CR}=0,{DV}=0,{N}=0),"—",{COST}/{{wrev}})', DEC1, "months",
         "12 ÷ monthly revenue won back", None),
    ]

    # layout pass: assign rows (a blank row before each section header)
    layout, r_ = [], 5
    for item in rows:
        if item[0] == "__sec__":
            r_ += 1
            layout.append((r_, item))
            r_ += 1
        else:
            layout.append((r_, item))
            r_ += 1
    row_of = {item[0]: rr for rr, item in layout if item[0] != "__sec__"}
    RESULT_ROWS.update(row_of)

    for rr, item in layout:
        if item[0] == "__sec__":
            for c in "BCDE":
                rs[f"{c}{rr}"].fill = fill(MIST)
            rs.cell(row=rr, column=2, value=item[1]).font = f_sec
            rs.cell(row=rr, column=5, value="How it's calculated (numbers = inputs on Your numbers)").font = f_note
            rs.row_dimensions[rr].height = 24
            continue
        key, label, formula, fmt, unit, expl, style = item
        formula = formula.format(**{k: f"C{v}" for k, v in row_of.items()}) if "{" in formula else formula
        b = rs.cell(row=rr, column=2, value=label)
        c = rs.cell(row=rr, column=3, value=formula)
        d = rs.cell(row=rr, column=4, value=(f"={CUR}" if unit == "cur" else unit))
        e = rs.cell(row=rr, column=5, value=expl)
        b.font = f_bold if style in ("bold", "key") else f_body
        c.font = f_key if style == "key" else (f_bold if style == "bold" else f_body)
        c.number_format, c.alignment = fmt, right
        d.font, e.font = f_note, f_note
        b.alignment, e.alignment, d.alignment = wrap, wrap, center
        for cell in (b, c, d, e):
            cell.border = box
        rs.row_dimensions[rr].height = 30 if len(expl) > 60 or len(label) > 50 else 22

    r_ += 1
    for c in "BCDE":
        rs[f"{c}{r_}"].fill = fill(MIST)
    rs.cell(row=r_, column=2, value="Assumptions, in plain words").font = f_sec
    r_ += 1
    notes = [
        "1. \"At risk\" means an enquiry hit at least one leak. It does not mean it was lost.",
        "2. A late reply and no follow-up are treated as independent, so an enquiry hit by both is counted once.",
        "3. Money at risk uses your current close rate for every enquiry. Fast-answered leads may close better or worse.",
        "4. The win-back lines use only your own guess (input 11). AskHemant supplies no ROI figure, and nothing here is a promise or forecast.",
        "5. No-shows are shown as a count and hours; they are not added to the money lines, to avoid counting the same lead twice.",
        "6. All amounts are before tax, in the currency label you chose (input 13).",
    ]
    for t in notes:
        cell = rs.cell(row=r_, column=2, value=t)
        rs.merge_cells(start_row=r_, start_column=2, end_row=r_, end_column=5)
        cell.font, cell.alignment = f_body, wrap
        rs.row_dimensions[r_].height = 30
        r_ += 1
    r_ += 1
    rs.cell(row=r_, column=2, value="Want a second opinion on these numbers? Free 20-min Fit Call: askhemant.ai/book").font = f_sec
    rs.freeze_panes = "A5"

    for sheet in (hw, ws, rs):
        sheet.sheet_properties.tabColor = INDIGO if sheet is not ws else "FFB020"
        sheet.page_setup.orientation = "landscape"
        sheet.page_setup.fitToWidth = 1
        sheet.sheet_properties.pageSetUpPr.fitToPage = True

    wb.active = 0
    wb.calculation.fullCalcOnLoad = True
    wb.properties.title = "Lead Leak Calculator"
    wb.properties.creator = "AskHemant (askhemant.ai)"
    wb.save(OUT)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
