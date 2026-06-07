//using MiniExcelLibs;
using System;
using System.IO;
using System.Linq;

namespace temp_excel_reader
{
    class Program
    {
        static void Main(string[] args)
        {
            //try
            //{
            //    string path = @"..\مؤشرات استراتيجية.xlsx";
            //    var sheets = MiniExcel.GetSheetNames(path);
            //    foreach (var sheet in sheets)
            //    {
            //        Console.WriteLine($"Sheet: {sheet}");
            //        var rows = MiniExcel.Query(path, useHeaderRow: false, sheetName: sheet).ToList();
            //        Console.WriteLine($"Total rows: {rows.Count}");
            //        for (int i = 0; i < rows.Count; i++)
            //        {
            //            var row = (IDictionary<string, object>)rows[i];
            //            Console.Write($"Row {i+1}: ");
            //            foreach (var kvp in row)
            //            {
            //                if (kvp.Value != null && !string.IsNullOrWhiteSpace(kvp.Value.ToString()))
            //                {
            //                    Console.Write($"[{kvp.Key}]: '{kvp.Value}' ");
            //                }
            //            }
            //            Console.WriteLine();
            //        }
            //    }
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine($"Exception: {ex.Message}");
            //}
        }
    }
}
