using ClosedXML.Excel;

string outDir = @"C:\Users\Ahmed-Abdelaziz\source\repos\NewFeature\NewFeature";

// ---- Template 1: Official Drivers roster ----
using (var wb = new XLWorkbook())
{
    var ws = wb.Worksheets.Add("السائقين الرسميين");
    string[] headers = { "number", "Employee", "IqamaNoForBank", "نهاية كارت التشغيل", "تاريخ انتهاء الرخصة",
        "Arabic Name", "Employee Name", "Nationality Id", "مكان العمل", "مشاركة الحج", "عمود2" };
    for (int i = 0; i < headers.Length; i++) ws.Cell(1, i + 1).Value = headers[i];

    object[][] rows = {
        new object[] { 1, "R100001", "2200000001", "05-10-2026", "", "مثال اسم السائق الأول", "EXAMPLE DRIVER ONE", "مصري", "سائق حافله", "", "" },
        new object[] { 2, "R100002", "2200000002", "05-10-2026", "12-08-2027", "مثال اسم السائق الثاني", "EXAMPLE DRIVER TWO", "سعودي", "سائق حافله", "", "" },
    };
    for (int r = 0; r < rows.Length; r++)
        for (int c = 0; c < rows[r].Length; c++)
            ws.Cell(r + 2, c + 1).Value = XLCellValue.FromObject(rows[r][c]);

    ws.Columns().AdjustToContents();
    wb.SaveAs(Path.Combine(outDir, "wwwroot", "templates", "Operations_Drivers_Template.xlsx"));
    wb.SaveAs(Path.Combine(outDir, "Templates", "Operations_Drivers_Template.xlsx"));
}

// ---- Template 2: Route Scheduling ----
using (var wb = new XLWorkbook())
{
    var ws = wb.Worksheets.Add("ورقة1");
    string[] headers = { "تاريخ التنفيذ", "رقم أمر الايجار", "وقت التنفيذ", "مرجع العميل", "المنفذ", "طلب العميل",
        "أسم العميل", "كود الاتجاة", "اسم الصنف", "ملاحظات", "نوع الحافلة", "نوع الحافلة2", "مكان التشغيل",
        "العدد القابل للجدولة", "الجدولة" };
    for (int i = 0; i < headers.Length; i++) ws.Cell(1, i + 1).Value = headers[i];

    object[][] rows = {
        new object[] { "8/20/2026", "00099999_33", "0:00:00", "مثال مرجع", "متعدد", "خارجي", "شركة مثال للسياحة", "L100",
            "مثال اسم الصنف", "", "CityYT2020", "CityYT2020", "المدينة", 1, 1 },
        new object[] { "8/20/2026", "00099998_33", "0:00:00", "مثال مرجع 2", "داخلى", "صلوات", "شركة مثال أخرى", "L101",
            "صلوات صباحية", "", "CityYT2020", "CityYT2020", "Salawat", 2, "غير مجدول" },
    };
    for (int r = 0; r < rows.Length; r++)
        for (int c = 0; c < rows[r].Length; c++)
            ws.Cell(r + 2, c + 1).Value = XLCellValue.FromObject(rows[r][c]);

    ws.Columns().AdjustToContents();
    wb.SaveAs(Path.Combine(outDir, "wwwroot", "templates", "Operations_RouteSchedule_Template.xlsx"));
    wb.SaveAs(Path.Combine(outDir, "Templates", "Operations_RouteSchedule_Template.xlsx"));
}

Console.WriteLine("Templates written.");
