using MiniExcelLibs;
using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace temp_excel_reader
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            try
            {
                string path = @"newKpi.xlsx";
                var sheets = MiniExcel.GetSheetNames(path);
                using (var writer = new StreamWriter(@"scratch\kpis_clean.txt", false, System.Text.Encoding.UTF8))
                {
                    foreach (var sheet in sheets)
                    {
                        string line = $"--- Sheet: {sheet} ---";
                        Console.WriteLine(line);
                        writer.WriteLine(line);
                        var rows = MiniExcel.Query(path, useHeaderRow: false, sheetName: sheet).ToList();
                        line = $"Total rows: {rows.Count}";
                        Console.WriteLine(line);
                        writer.WriteLine(line);
                        for (int i = 0; i < rows.Count; i++)
                        {
                            var row = (IDictionary<string, object>)rows[i];
                            var parts = new List<string>();
                            parts.Add($"Row {i+1}:");
                            foreach (var kvp in row)
                            {
                                if (kvp.Value != null && !string.IsNullOrWhiteSpace(kvp.Value.ToString()))
                                {
                                    parts.Add($"[{kvp.Key}]: '{kvp.Value}'");
                                }
                            }
                            string fullLine = string.Join(" ", parts);
                            Console.WriteLine(fullLine);
                            writer.WriteLine(fullLine);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }
        }
    }
}
