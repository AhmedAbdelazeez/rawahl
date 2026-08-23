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
                string onedrivePath = @"..\OneDrive_2_8-21-2026";
                string outputPath = @"..\scratch\onedrive_sheets_summary.txt";
                
                using (var writer = new StreamWriter(outputPath, false, System.Text.Encoding.UTF8))
                {
                    writer.WriteLine("=== ONEDRIVE SHEETS SUMMARY ===");
                    writer.WriteLine($"Generated at: {DateTime.Now}");
                    writer.WriteLine();

                    var files = Directory.GetFiles(onedrivePath, "*.*", SearchOption.AllDirectories)
                        .Where(f => (f.EndsWith(".xlsx", StringComparison.OrdinalIgnoreCase) || 
                                     f.EndsWith(".xltx", StringComparison.OrdinalIgnoreCase)) &&
                                    !f.Contains("Z IGNORE ME"))
                        .OrderBy(f => f)
                        .ToList();

                    writer.WriteLine($"Found {files.Count} Excel files.");
                    writer.WriteLine();

                    foreach (var file in files)
                    {
                        writer.WriteLine(new string('=', 80));
                        writer.WriteLine($"FILE: {Path.GetRelativePath(onedrivePath, file)}");
                        writer.WriteLine(new string('=', 80));

                        try
                        {
                            var sheets = MiniExcel.GetSheetNames(file);
                            writer.WriteLine($"Sheets: {string.Join(", ", sheets)}");
                            writer.WriteLine();

                            foreach (var sheet in sheets)
                            {
                                writer.WriteLine($"  --- Sheet: {sheet} ---");
                                var rows = MiniExcel.Query(file, useHeaderRow: false, sheetName: sheet).ToList();
                                writer.WriteLine($"  Total Rows: {rows.Count}");
                                
                                if (rows.Count == 0)
                                {
                                    writer.WriteLine("  No data.");
                                    writer.WriteLine();
                                    continue;
                                }

                                int previewCount = Math.Min(rows.Count, 5);
                                writer.WriteLine($"  Previewing first {previewCount} rows:");
                                for (int i = 0; i < previewCount; i++)
                                {
                                    var row = (IDictionary<string, object>)rows[i];
                                    var parts = new List<string>();
                                    foreach (var kvp in row)
                                    {
                                        if (kvp.Value != null && !string.IsNullOrWhiteSpace(kvp.Value.ToString()))
                                        {
                                            parts.Add($"[{kvp.Key}]: '{kvp.Value}'");
                                        }
                                    }
                                    writer.WriteLine($"    Row {i + 1}: {string.Join(" | ", parts)}");
                                }
                                writer.WriteLine();
                            }
                        }
                        catch (Exception ex)
                        {
                            writer.WriteLine($"  Error reading file: {ex.Message}");
                        }
                        writer.WriteLine();
                    }
                }
                Console.WriteLine("Done! Check scratch/onedrive_sheets_summary.txt");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }
        }
    }
}
