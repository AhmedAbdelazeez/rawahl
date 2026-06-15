const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
let content = fs.readFileSync(filePath, 'utf8');

const startToken = '<!-- ================= أولاً: شاشة الملخص العام والتفصيل الكلي (Overview View) ================= -->';
const endToken = '<!-- ================= ثالثاً: شبكة الإدارات والأقسام (Departments Grid View) ================= -->';

const startIndex = content.indexOf(startToken);
if (startIndex === -1) {
    console.error('Start token not found');
    process.exit(1);
}

const endIndex = content.indexOf(endToken);
if (endIndex === -1) {
    console.error('End token not found');
    process.exit(1);
}

const newViews = `<!-- ================= أولاً: شاشة الملخص العام والتفصيل الكلي (Overview View) ================= -->
            <div id="view-overview" class="view-container">
                <!-- Executive Summary Section (News Feed / Management Summary) -->
                <section class="mb-8" data-aos="fade-up">
                    <div class="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 text-slate-200 border-2 border-[#b0841a]/60 shadow-xl relative overflow-hidden">
                        <div class="absolute -right-24 -top-24 w-72 h-72 bg-[#b0841a]/10 rounded-full blur-3xl"></div>
                        <div class="absolute -left-24 -bottom-24 w-72 h-72 bg-[#b0841a]/10 rounded-full blur-3xl"></div>
                        
                        <div class="flex flex-col lg:flex-row justify-between items-stretch gap-6 relative z-10">
                            <!-- Left Side: Alerts & Insights Feed -->
                            <div class="flex-1 space-y-4 text-start border-b lg:border-b-0 lg:border-l border-slate-700/50 pb-6 lg:pb-0 lg:pl-6">
                                <span class="bg-[#b0841a]/25 text-[#fcd34d] text-[10px] px-3.5 py-1.5 rounded-full font-black border border-[#b0841a]/40 inline-block" data-i18n="exec-summary-badge">لوحة القيادة والمؤشرات التنفيذية للرئاسة التنفيذية</span>
                                <h2 class="text-xl font-black text-white mt-1" data-i18n="exec-summary-title">موجز الإدارة التنفيذية والتحليل الذكي</h2>
                                
                                <div class="space-y-3 mt-4 text-xs font-semibold text-neutral-300 leading-relaxed max-h-60 overflow-y-auto pr-1">
                                    <div class="flex items-start gap-2.5 bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
                                        <i class="fa-solid fa-chart-line text-emerald-400 mt-0.5 shrink-0"></i>
                                        <div>
                                            <strong class="text-white block mb-0.5">نمو الإيرادات والأداء المالي</strong>
                                            <span>ارتفعت إيرادات الشركة الإجمالية بمعدل 12% مقارنة بالشهر السابق لتصل إلى 142.5 مليون ر.س بدعم قوي من قطاع العقود والاتفاقيات.</span>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-2.5 bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
                                        <i class="fa-solid fa-bus text-[#b0841a] mt-0.5 shrink-0"></i>
                                        <div>
                                            <strong class="text-white block mb-0.5">كفاءة تشغيل حافلات النقل التخصصي</strong>
                                            <span>سجل معدل كفاءة استغلال الأسطول في مسارات مكة-المدينة زيادة تتجاوز المستهدف بنسبة 8% خلال الفترة الماضية.</span>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-2.5 bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
                                        <i class="fa-solid fa-hotel text-emerald-400 mt-0.5 shrink-0"></i>
                                        <div>
                                            <strong class="text-white block mb-0.5">حجوزات الفنادق للمعتمرين</strong>
                                            <span>سجلت عوائد خدمات إقامة المعتمرين وحجوزات الفنادق قفزة بنمو 15% نتيجة للشراكات الاستراتيجية.</span>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-2.5 bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
                                        <i class="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5 shrink-0"></i>
                                        <div>
                                            <strong class="text-white block mb-0.5">تنبيهات الإدارة والمتابعة</strong>
                                            <span>يرجى الانتباه إلى أن بعض مؤشرات الأداء بالفرع التجاري تواجه تباطؤاً طفيفاً وتتطلب مراجعة من الإدارة التشغيلية.</span>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-2.5 bg-gradient-to-r from-amber-500/10 to-transparent p-3 rounded-xl border border-[#b0841a]/20">
                                        <i class="fa-solid fa-robot text-[#fcd34d] mt-0.5 shrink-0 animate-pulse"></i>
                                        <div>
                                            <strong class="text-[#fcd34d] block mb-0.5">توصيات الذكاء الاصطناعي لتطوير الأداء</strong>
                                            <span>نقترح توجيه 15% من الحافلات الاحتياطية لرحلات التأجير السياحي خلال عطلة نهاية الأسبوع لزيادة استغلال المقاعد بنسبة 6% وتحقيق عوائد هامشية إضافية.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Right Side: Unified Executive KPIs & Speedometer/Radial Summary -->
                            <div class="w-full lg:w-80 shrink-0 flex flex-col justify-between gap-4">
                                <div class="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/40 flex items-center justify-between">
                                    <div class="text-start">
                                        <span class="text-[10px] text-slate-400 block font-bold">إجمالي إيرادات الشركة</span>
                                        <span class="text-xl font-black text-white">142.5 مليون ر.س</span>
                                    </div>
                                    <span class="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20 font-black">+12% مقارنة بالسابق</span>
                                </div>
                                <div class="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/40 flex items-center justify-between">
                                    <div class="text-start">
                                        <span class="text-[10px] text-slate-400 block font-bold">نسبة إنجاز مؤشرات الأداء</span>
                                        <span class="text-xl font-black text-white" id="exec-kpi-achieve-val">91%</span>
                                    </div>
                                    <span class="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/20 font-black">أداء مستهدف ممتاز</span>
                                </div>
                                
                                <div class="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/40 flex items-center justify-between">
                                    <div class="text-start flex flex-col justify-center">
                                        <span class="text-[10px] text-slate-400 block font-bold">متوسط الصحة الكلية للمؤشرات</span>
                                        <span class="text-xs text-[#fcd34d] font-bold mt-1" id="exec-status-text">صحة الأداء ممتازة 🟢</span>
                                    </div>
                                    <div class="relative w-16 h-16 flex items-center justify-center bg-slate-900 rounded-full p-1 border border-slate-700">
                                        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                            <path class="text-slate-800" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            <path id="radial-progress-path-exec" class="text-[#b0841a]" stroke-dasharray="91, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        </svg>
                                        <div class="absolute flex flex-col items-center justify-center">
                                            <span class="text-xs font-black text-white" id="radial-progress-val-exec">91%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Two Executive Business Cards Section -->
                <section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-start" data-aos="fade-up">
                    <!-- Card 1: Specialized Transportation (النقل التخصصي) -->
                    <div class="glass-card p-6 rounded-3xl border-2 border-[#b0841a]/50 relative overflow-hidden flex flex-col justify-between min-h-[350px] bg-gradient-to-br from-white to-[#faf6ec]/50 group">
                        <div class="absolute top-0 left-0 w-24 h-24 bg-[#b0841a]/5 rounded-br-full"></div>
                        <div>
                            <div class="flex justify-between items-start">
                                <h3 class="text-lg sm:text-xl font-black text-slate-950 flex items-center gap-2.5">
                                    <i class="fa-solid fa-bus text-[#b0841a] text-2xl animate-pulse"></i>
                                    <span data-i18n="nav-transportation">قطاع النقل التخصصي</span>
                                </h3>
                                @if (Model.IsTransportationManager)
                                {
                                    <span class="text-xs font-black px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">🟢 ممتاز</span>
                                }
                                else
                                {
                                    <span class="text-xs font-black px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200"><i class="fa-solid fa-lock me-1"></i>مغلق</span>
                                }
                            </div>
                            <p class="text-xs sm:text-sm text-slate-600 font-semibold mt-3 leading-relaxed">
                                إدارة الهيكل التنظيمي المعتمد وعمليات النقل والتشغيل للحافلات وعقود الحج والعمرة والاتفاقيات التجارية وإدارات الشركة المساندة.
                            </p>
                            
                            <!-- Key Metrics Quick View -->
                            <div class="grid grid-cols-3 gap-3 my-5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                <div>
                                    <span class="text-[10px] text-slate-500 block font-bold">إجمالي الإيراد</span>
                                    <span class="text-sm font-black text-slate-900 mt-0.5 block">142.5 مليون</span>
                                </div>
                                <div>
                                    <span class="text-[10px] text-slate-500 block font-bold">معدل النمو</span>
                                    <span class="text-sm font-black text-emerald-600 mt-0.5 block">+8.2%</span>
                                </div>
                                <div>
                                    <span class="text-[10px] text-slate-500 block font-bold">نسبة التحقيق</span>
                                    <span class="text-sm font-black text-slate-900 mt-0.5 block">91%</span>
                                </div>
                            </div>
                            
                            <!-- Indicators summary -->
                            <div class="flex items-center gap-4 text-xs font-bold text-slate-600 mt-2">
                                <span class="flex items-center gap-1">🟢 <span class="text-slate-800">18 ممتاز</span></span>
                                <span class="flex items-center gap-1">🟡 <span class="text-slate-800">3 جيد</span></span>
                                <span class="flex items-center gap-1">🔴 <span class="text-slate-800">1 ضعيف</span></span>
                            </div>
                        </div>

                        <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <!-- Sparkline SVG trend line -->
                                <svg class="w-24 h-8 text-[#b0841a]" viewBox="0 0 100 30" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M0,25 Q15,10 30,15 T60,5 T90,10 T100,2" />
                                </svg>
                                <span class="text-[10px] text-[#b0841a] font-black">تصاعدي 📈</span>
                            </div>
                            @if (Model.IsTransportationManager)
                            {
                                <button onclick="showView('transportation-sector')" class="px-5 py-2.5 bg-gradient-to-l from-[#b0841a] to-[#8c6510] text-white font-bold rounded-xl text-xs shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer">
                                    <span>الدخول للمنصة</span>
                                    <i class="fa-solid fa-chevron-left"></i>
                                </button>
                            }
                            else
                            {
                                <button disabled class="px-5 py-2.5 bg-slate-200 text-slate-400 font-bold rounded-xl text-xs cursor-not-allowed flex items-center gap-1.5">
                                    <i class="fa-solid fa-lock"></i>
                                    <span>مغلق للصلاحية</span>
                                </button>
                            }
                        </div>
                    </div>

                    <!-- Card 2: Tourism & Pilgrim Services (السياحة وخدمات المعتمرين) -->
                    <div class="glass-card p-6 rounded-3xl border-2 border-[#b0841a]/50 relative overflow-hidden flex flex-col justify-between min-h-[350px] bg-gradient-to-br from-white to-[#faf6ec]/50 group">
                        <div class="absolute top-0 left-0 w-24 h-24 bg-[#b0841a]/5 rounded-br-full"></div>
                        <div>
                            <div class="flex justify-between items-start">
                                <h3 class="text-lg sm:text-xl font-black text-slate-950 flex items-center gap-2.5">
                                    <i class="fa-solid fa-kaaba text-[#b0841a] text-2xl animate-pulse"></i>
                                    <span data-i18n="nav-pilgrim-services">قطاع السياحة وخدمات المعتمرين</span>
                                </h3>
                                @if (Model.IsPilgrimServicesManager)
                                {
                                    <span class="text-xs font-black px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">🟢 ممتاز</span>
                                }
                                else
                                {
                                    <span class="text-xs font-black px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200"><i class="fa-solid fa-lock me-1"></i>مغلق</span>
                                }
                            </div>
                            <p class="text-xs sm:text-sm text-slate-600 font-semibold mt-3 leading-relaxed">
                                إدارة باقات وخدمات ضيوف الرحمن بما يشمل إصدار التأشيرات، حجوزات الفنادق، نقل المعتمرين، والضيافة والتموين المتكاملة.
                            </p>
                            
                            <!-- Key Metrics Quick View -->
                            <div class="grid grid-cols-3 gap-3 my-5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                <div>
                                    <span class="text-[10px] text-slate-500 block font-bold">إجمالي الإيراد</span>
                                    <span class="text-sm font-black text-slate-900 mt-0.5 block">89.5 مليون</span>
                                </div>
                                <div>
                                    <span class="text-[10px] text-slate-500 block font-bold">معدل النمو</span>
                                    <span class="text-sm font-black text-emerald-600 mt-0.5 block">+12.8%</span>
                                </div>
                                <div>
                                    <span class="text-[10px] text-slate-500 block font-bold">نسبة التحقيق</span>
                                    <span class="text-sm font-black text-slate-900 mt-0.5 block">89%</span>
                                </div>
                            </div>
                            
                            <!-- Indicators summary -->
                            <div class="flex items-center gap-4 text-xs font-bold text-slate-600 mt-2">
                                <span class="flex items-center gap-1">🟢 <span class="text-slate-800">9 ممتاز</span></span>
                                <span class="flex items-center gap-1">🟡 <span class="text-slate-800">2 جيد</span></span>
                                <span class="flex items-center gap-1">🔴 <span class="text-slate-800">1 ضعيف</span></span>
                            </div>
                        </div>

                        <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <!-- Sparkline SVG trend line -->
                                <svg class="w-24 h-8 text-[#b0841a]" viewBox="0 0 100 30" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M0,20 Q20,5 40,18 T70,8 T90,2 T100,5" />
                                </svg>
                                <span class="text-[10px] text-emerald-600 font-black">نمو متسارع 🚀</span>
                            </div>
                            @if (Model.IsPilgrimServicesManager)
                            {
                                <button onclick="showView('pilgrim-sector')" class="px-5 py-2.5 bg-gradient-to-l from-[#b0841a] to-[#8c6510] text-white font-bold rounded-xl text-xs shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer">
                                    <span>الدخول للمنصة</span>
                                    <i class="fa-solid fa-chevron-left"></i>
                                </button>
                            }
                            else
                            {
                                <button disabled class="px-5 py-2.5 bg-slate-200 text-slate-400 font-bold rounded-xl text-xs cursor-not-allowed flex items-center gap-1.5">
                                    <i class="fa-solid fa-lock"></i>
                                    <span>مغلق للصلاحية</span>
                                </button>
                            }
                        </div>
                    </div>
                </section>
            </div>

            <!-- ================= قطاع النقل التخصصي (Specialized Transportation View) ================= -->
            <div id="view-transportation-sector" class="view-container hidden">
                <section class="mb-6" data-aos="fade-up">
                    <div class="bg-white rounded-3xl p-6 text-slate-800 border border-[#b0841a]/30 relative overflow-hidden">
                        <div class="absolute -right-24 -top-24 w-64 h-64 bg-[#b0841a]/5 rounded-full blur-3xl"></div>
                        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10 text-start">
                            <div>
                                <span class="bg-[#b0841a]/10 text-[#b0841a] text-[10px] px-3.5 py-1.5 rounded-full font-bold border border-[#b0841a]/20">المنصة التنفيذية التشغيلية</span>
                                <h2 class="text-lg font-black mt-2 text-slate-800">إدارات وأقسام قطاع النقل التخصصي</h2>
                                <p class="text-slate-500 text-xs leading-relaxed font-semibold mt-1">بوابة المراقبة والتحليل الموحد لهيكل إدارات قطاع النقل وأسطول الحافلات والحج والتشغيل.</p>
                            </div>
                            <button onclick="showView('overview')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-black rounded-xl text-slate-800 flex items-center gap-1.5 transition">
                                <i class="fa-solid fa-arrow-right"></i>
                                <span>العودة للرئيسية</span>
                            </button>
                        </div>
                    </div>
                </section>

                <!-- 4 Top Executive KPIs for Sector -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-start" data-aos="fade-up">
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-coins text-[#b0841a]"></i> إجمالي الإيرادات</span>
                        <span class="text-2xl font-black text-slate-900 mt-2">142.5 مليون ر.س</span>
                        <span class="text-[9px] text-emerald-600 font-black">+8.2% نمو سنوي</span>
                    </div>
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-chart-line text-[#b0841a]"></i> معدل النمو للقطاع</span>
                        <span class="text-2xl font-black text-slate-900 mt-2">+8.2%</span>
                        <span class="text-[9px] text-slate-400 font-bold">مستقر مقارنة بالمستهدف</span>
                    </div>
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-bullseye text-[#b0841a]"></i> تحقيق المستهدفات</span>
                        <span class="text-2xl font-black text-slate-900 mt-2">91%</span>
                        <div class="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                            <div class="bg-gradient-to-r from-[#b0841a] to-[#8c6510] h-1.5 rounded-full" style="width: 91%"></div>
                        </div>
                    </div>
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-gears text-[#b0841a]"></i> إجمالي العمليات والرحلات</span>
                        <span class="text-2xl font-black text-slate-900 mt-2">12,420 رحلة</span>
                        <span class="text-[9px] text-slate-400 font-bold">مسجلة بالخطة التشغيلية</span>
                    </div>
                </div>

                <!-- 9 Departments Grid -->
                <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 text-start" data-aos="fade-up">
                    <!-- Contracts -->
                    <div onclick="showView('contracts')" class="glass-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between h-44 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-file-signature text-[#b0841a] text-base"></i>
                                    <span>قطاع العقود والاتفاقيات</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">توقيع العقود الاستراتيجية والاحتفاظ بالعملاء والامتثال للسياسات الحكومية والمشاريع.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">5 مؤشرات أداء</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">CONTRACTS</span>
                        </div>
                    </div>

                    <!-- Hajj & Umrah -->
                    <div onclick="showView('hajj')" class="glass-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between h-44 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-kaaba text-[#b0841a] text-base"></i>
                                    <span>قطاع الحج والعمرة للنقل</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">إدارة تفويج ضيوف الرحمن والتزام المسارات وجاهزية الأسطول والأمن والسلامة.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">5 مؤشرات أداء</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">HAJJ</span>
                        </div>
                    </div>

                    <!-- Rental & Operation -->
                    <div onclick="showView('leasing')" class="glass-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between h-44 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-bus-simple text-[#b0841a] text-base"></i>
                                    <span>قطاع الإيجار والتشغيل</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">إيرادات النقل العام والتأجير السياحي وهوامش الربح واستغلال أسطول المركبات.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">5 مؤشرات أداء</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">RENTAL</span>
                        </div>
                    </div>

                    <!-- Finance -->
                    <div onclick="showView('dept-finance')" class="glass-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between h-44 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-wallet text-[#b0841a] text-base"></i>
                                    <span>مؤشرات الأداء المالي</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">الإيرادات والربحية والتدفقات النقدية التشغيلية والعائد الكلي على الأصول.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">4 مؤشرات أداء</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">FINANCE</span>
                        </div>
                    </div>

                    <!-- Commercial & Customer -->
                    <div onclick="showView('dept-commercial')" class="glass-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between h-44 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-users text-[#b0841a] text-base"></i>
                                    <span>مؤشرات الفرع التجاري والعملاء</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">نقاط رضا العملاء NPS ونسب الاحتفاظ وتوقيع العقود الاستراتيجية الجديدة.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">3 مؤشرات أداء</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">COMMERCIAL</span>
                        </div>
                    </div>

                    <!-- Operations & Fleet -->
                    <div onclick="showView('dept-ops')" class="glass-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between h-44 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-bus text-[#b0841a] text-base"></i>
                                    <span>مؤشرات العمليات وأسطول الحافلات</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">الالتزام بالخطة التشغيلية وجاهزية الحافلات ونسبة استغلال مقاعد التشغيل.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">3 مؤشرات أداء</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">OPERATIONS</span>
                        </div>
                    </div>

                    <!-- HR & Support -->
                    <div onclick="showView('dept-support')" class="glass-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between h-44 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-laptop-code text-[#b0841a] text-base"></i>
                                    <span>الموارد البشرية والتحول الرقمي</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">الاحتفاظ بالكوادر، أتمتة الورش ومشاريع التحول الرقمي ونسب السعوده.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">4 مؤشرات أداء</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">SUPPORT</span>
                        </div>
                    </div>

                    <!-- HSE & Compliance -->
                    <div onclick="showView('dept-hse')" class="glass-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between h-44 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-shield-virus text-[#b0841a] text-base"></i>
                                    <span>السلامة HSE والامتثال والتدقيق</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">معدل الحوادث، الالتزام باللوائح والتراخيص والسلامة العامة على الطرق.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">3 مؤشرات أداء</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">HSE</span>
                        </div>
                    </div>

                    <!-- Strategy & PMO -->
                    <div onclick="showView('dept-strategy')" class="glass-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between h-44 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-university text-[#b0841a] text-base"></i>
                                    <span>مؤشرات الاستراتيجية والمشاريع والمشاريع PMO</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">تحقيق الأهداف، مبادرات مكتب PMO، إدارة المخاطر المؤسسية ونضج الحوكمة.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">5 مؤشرات أداء</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">STRATEGY</span>
                        </div>
                    </div>
                </section>
            </div>

            <!-- ================= قطاع السياحة وخدمات المعتمرين (Tourism & Pilgrim Services View) ================= -->
            <div id="view-pilgrim-sector" class="view-container hidden">
                <section class="mb-6" data-aos="fade-up">
                    <div class="bg-white rounded-3xl p-6 text-slate-800 border border-[#b0841a]/30 relative overflow-hidden">
                        <div class="absolute -right-24 -top-24 w-64 h-64 bg-[#b0841a]/5 rounded-full blur-3xl"></div>
                        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10 text-start">
                            <div>
                                <span class="bg-[#b0841a]/10 text-[#b0841a] text-[10px] px-3.5 py-1.5 rounded-full font-bold border border-[#b0841a]/20">المنصة التنفيذية للخدمات</span>
                                <h2 class="text-lg font-black mt-2 text-slate-800">باقات وخدمات قطاع المعتمرين والسياحة</h2>
                                <p class="text-slate-500 text-xs leading-relaxed font-semibold mt-1">بوابة المراقبة والتحليل لرحلة ضيوف الرحمن: إصدار التأشيرات، الفنادق، النقل، والضيافة المتكاملة.</p>
                            </div>
                            <button onclick="showView('overview')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-black rounded-xl text-slate-800 flex items-center gap-1.5 transition">
                                <i class="fa-solid fa-arrow-right"></i>
                                <span>العودة للرئيسية</span>
                            </button>
                        </div>
                    </div>
                </section>

                <!-- 4 Top Executive KPIs for Pilgrim Sector -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-start" data-aos="fade-up">
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-coins text-[#b0841a]"></i> إجمالي الإيرادات للقطاع</span>
                        <span class="text-2xl font-black text-slate-900 mt-2">89.5 مليون ر.س</span>
                        <span class="text-[9px] text-emerald-600 font-black">+12.8% نمو متسارع</span>
                    </div>
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-chart-line text-[#b0841a]"></i> معدل النمو التشغيلي</span>
                        <span class="text-2xl font-black text-slate-900 mt-2">+12.8%</span>
                        <span class="text-[9px] text-slate-400 font-bold">بالمقارنة بالشهر السابق</span>
                    </div>
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-bullseye text-[#b0841a]"></i> كفاءة تحقيق المستهدف</span>
                        <span class="text-2xl font-black text-slate-900 mt-2">89%</span>
                        <div class="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                            <div class="bg-gradient-to-r from-[#b0841a] to-[#8c6510] h-1.5 rounded-full" style="width: 89%"></div>
                        </div>
                    </div>
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-gears text-[#b0841a]"></i> إجمالي العمليات والمعاملات</span>
                        <span class="text-2xl font-black text-slate-900 mt-2">70,400 معاملة</span>
                        <span class="text-[9px] text-slate-400 font-bold">تأشيرة، حجز، رحلة وضيافة</span>
                    </div>
                </div>

                <!-- 4 Grouped Services Grid -->
                <section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-start" data-aos="fade-up">
                    <!-- Visa Issuance -->
                    <div onclick="showView('service-visa')" class="glass-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between h-48 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-passport text-[#b0841a] text-lg"></i>
                                    <span>خدمة إصدار التأشيرات</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">أتمتة وإصدار تأشيرات العمرة الإلكترونية والربط مع نظام وزارة الخارجية لسرعة إنجاز معاملات المعتمرين.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">إيراد القطاع: 15.4 مليون ر.س</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">VISA</span>
                        </div>
                    </div>

                    <!-- Hotel Booking -->
                    <div onclick="showView('service-hotels')" class="glass-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between h-48 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-hotel text-[#b0841a] text-lg"></i>
                                    <span>خدمة حجز الفنادق والسكن</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">حجز وتأمين الغرف الفندقية والسكن لبعثات الحج والعمرة بمكة المكرمة والمدينة المنورة بشراكات استراتيجية.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">إيراد القطاع: 28.2 مليون ر.س</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">HOTEL</span>
                        </div>
                    </div>

                    <!-- Pilgrim Transport -->
                    <div onclick="showView('service-transport')" class="glass-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between h-48 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-bus text-[#b0841a] text-lg"></i>
                                    <span>خدمة نقل المعتمرين</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">تفويج ونقل ضيوف الرحمن بين المنافذ والمطارات والفنادق وحول المشاعر المقدسة بحافلات مخصصة وحديثة.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">إيراد القطاع: 35.8 مليون ر.س</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">TRANSPORT</span>
                        </div>
                    </div>

                    <!-- Hospitality -->
                    <div onclick="showView('service-hospitality')" class="glass-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between h-48 group bg-white hover:border-[#b0841a]">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <i class="fa-solid fa-utensils text-[#b0841a] text-lg"></i>
                                    <span>خدمة الضيافة والتموين الإعاشة</span>
                                </h3>
                                <p class="text-[10px] text-slate-500 font-semibold mt-2 leading-relaxed">تقديم الوجبات الغذائية المتميزة وخدمات الضيافة والإعاشة في مقار سكن المعتمرين وبعثات ضيوف الرحمن.</p>
                            </div>
                            <span class="w-8 h-8 rounded-full bg-[#b0841a]/10 text-[#b0841a] flex items-center justify-center text-xs font-bold shrink-0 shadow-inner group-hover:bg-[#b0841a] group-hover:text-white transition-colors"><i class="fa-solid fa-arrow-left ltr:rotate-180"></i></span>
                        </div>
                        <div class="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                            <span class="text-[9px] text-[#b0841a] font-black">إيراد القطاع: 10.1 مليون ر.س</span>
                            <span class="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black border border-slate-200">HOSPITALITY</span>
                        </div>
                    </div>
                </section>
            </div>
`;

const replaceIndex = content.indexOf(startToken);
content = content.substring(0, replaceIndex) + newViews + content.substring(endIndex);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Index.cshtml view replacement successful');
