// Tichers and Common General Utilities and Translations
const translations = {
    'ar': {
        'langToggleText': 'English (EN)',
        'sidebar-logo-text': 'شركة رواحل المشاعر',
        'sidebar-business-areas': 'إدارات الأعمال الحيوية',
        'sidebar-company-depts': 'إدارات وأقسام الشركة',
        'nav-overview': 'الرئيسية والتحليل الموحد',
        'nav-transportation': 'رواحل للنقل التخصصي',
        'nav-pilgrim-services': 'رواحل لخدمات العمره والسياحه',
        'show-all-departments': 'عرض جميع الإدارات',
        'sidebar-settings': 'إعدادات المستهدفات',
        'sidebar-copyright': 'نظام رواحل القياسي المعتمد © 2026',
        'header-title': 'نظام مراقبة الأداء لشركة رواحل المشاعر',
        'header-subtitle': 'لوحة تفاعلية حية متصلة بقاعدة البيانات ومطابقة لألوان الهوية الرسمية',
        'header-ceo-name': 'غسان عراقي',
        'header-ceo-role': 'المدير العام (CEO)',
        'ticker-perf-label': 'الأداء العام لشركة رواحل:',
        'ticker-perf-desc': 'معدل إنجاز إدارات التشغيل',
        'ticker-may': 'لشهر مايو.',
        'ticker-revenue-label': 'نمو الإيرادات:',
        'ticker-revenue-desc': 'حققنا نسبة نمو بقيمة',
        'ticker-ebitda-label': 'هامش EBITDA التشغيلي:',
        'ticker-ebitda-desc': 'أداء مالي متزن ويسجل',
        'ticker-fleet-label': 'جاهزية الأسطول الحالية:',
        'ticker-fleet-desc': 'جاهزية حافلات التشغيل ترتفع لـ',
        'ticker-fleet-total': '(إجمالي 1,240 حافلة).',
        'ticker-nps-label': 'رضا العملاء NPS:',
        'ticker-nps-desc': 'نقاط رضا ضيوف الرحمن تسجل',
        'ticker-ops-label': 'الالتزام بالخطة التشغيلية:',
        'ticker-ops-desc': 'نسبة الالتزام بجدول رحلات النقل بلغت',
        'summary-badge': 'نظرة عامة على الأداء الموحد',
        'summary-title': 'مصفوفة مؤشرات الأداء لشركة رواحل',
        'summary-desc': 'اختر إدارة الأعمال من اليسار أو تفقد المؤشرات التنفيذية للإدارات.',
        'summary-total': 'إجمالي المؤشرات',
        'summary-excellent': 'ممتاز 🟢',
        'summary-good': 'جيد 🟡',
        'summary-bad': 'ضعيف 🔴',
        'summary-avg-label': 'متوسط الأداء المالي والتشغيلي المجمع للإدارات',
        'overview-sector-perf': 'كفاءة أداء الإدارة الكلية',
        'chart-flags-title': 'توزيع تقييم مؤشرات الأداء الحالية (الأعلام)',
        'logout': 'خروج',
        'role-superadmin': 'مدير عام',
        'role-admin': 'مسؤول نظام',
        'role-manager': 'مدير إدارة',
        'role-user': 'مستخدم إدارة',
        'card-transport-desc': 'إدارة الهيكل التنظيمي المعتمد وعمليات النقل والتشغيل للحافلات وعقود الحج والعمرة والاتفاقيات التجارية وإدارات الشركة المساندة.',
        'card-pilgrim-desc': 'إدارة باقات وخدمات ضيوف الرحمن بما يشمل إصدار التأشيرات، حجوزات الفنادق، نقل المعتمرين، والضيافة والتموين المتكاملة.',
        'label-total-revenue': 'إجمالي الإيراد',
        'label-growth-rate': 'معدل النمو',
        'label-achievement-rate': 'نسبة التحقيق',
        'status-excellent': 'ممتاز',
        'status-good': 'جيد',
        'status-poor': 'ضعيف',
        'status-locked': 'مغلق',
        'trend-ascending': '<span data-i18n="trend-ascending">تصاعدي 📈</span>',
        'trend-accelerated': '<span data-i18n="trend-accelerated">نمو متسارع 🚀</span>',
        'btn-access-portal': 'الدخول للمنصة',
        'btn-locked-portal': 'مغلق للصلاحية',
        'company-name-main': 'شركة رواحل المشاعر',
        'company-desc-main': 'بوابة القيادة والمؤشرات التنفيذية الموحدة لشركة رواحل المشاعر للنقل التخصصي والتشغيل والخدمات اللوجستية.',
        'label-group-revenue': 'إجمالي إيراد المجموعة',
        'label-group-growth': 'معدل النمو المجمع',
        'label-group-achievement': 'نسبة إنجاز المستهدفات',
        'card-general-info-title': 'معلومات عامة والتحليل التنفيذي',
        'card-general-info-desc': 'موجز تنفيذي عالي المستوى لقطاعات النقل التخصصي والسياحة والضيافة، يمثل المدخل الرئيسي لمتابعة أداء الأعمال الحيوية.',
        'label-summary': 'لوحة معلومات ملخصة',
        'trend-stable': 'أداء تصاعدي 📈',
        'trend-accelerating': 'نمو متسارع 🚀',
        'company-sectors-title': 'قطاعات شركة رواحل المشاعر',
        'btn-back-overview': 'العودة للرئيسية',
        'dept-compliance-title': 'إدارة الامتثال',
        'dept-compliance-desc': 'متابعة التزام العمليات التشغيلية، والسياسات والإجراءات، وعقود التشغيل ومعالجة المخالفات.',
        'dept-kpi-count-10': '10 مؤشرات أداء',
        'dept-projects-title': 'إدارة المشاريع',
        'dept-projects-desc': 'مراقبة وتحليل أداء المشاريع الاستراتيجية والتشغيلية، بما يشمل النقل الترددي  وجولة مكة.',
        'dept-projects-count-2': 'مشروعين',
        'btn-back-depts': 'العودة للإدارات',
        'kpi-comp-ops-rate': 'نسبة الالتزام التشغيلي',
        'kpi-comp-violations-count': 'عدد المخالفات المسجلة',
        'kpi-comp-closure-rate': 'نسبة إغلاق المخالفات',
        'kpi-comp-resolution-time': 'متوسط زمن معالجة المخالفة',
        'kpi-comp-contract-rate': 'نسبة الالتزام بالعقود',
        'kpi-comp-policies-rate': 'الالتزام بالسياسات والإجراءات',
        'kpi-comp-audit-results': 'نتائج التدقيق الداخلي',
        'kpi-comp-critical-findings': 'عدد الملاحظات الحرجة',
        'kpi-comp-monthly-rate': 'معدل الامتثال الشهري',
        'kpi-comp-improvement-rate': 'نسبة التحسين المستمر',
        'chart-compliance-trend': 'تحليل اتجاه الامتثال الشهري (آخر 6 أشهر)',
        'chart-compliance-distribution': 'توزيع مؤشرات الامتثال',
        'table-compliance-tracking': 'جدول متابعة الأداء التاريخي والامتثال الشهري',
        'project-shuttle-title': 'مشروع النقل الترددي ',
        'project-makkah-tour-title': 'مشروع جولة مكة',
        'project-shuttle-detail-title': 'مشروع النقل الترددي  - التحليل التشغيلي',
        'project-makkah-tour-detail-title': 'مشروع جولة مكة - التحليل التشريحي والتشغيلي',
        'kpi-shuttle-beneficiaries': 'عدد المستفيدين',
        'kpi-shuttle-trips': 'عدد الرحلات',
        'kpi-shuttle-schedule-adherence': 'نسبة الالتزام بالجدول',
        'kpi-shuttle-satisfaction': 'نسبة رضا المستفيدين',
        'kpi-shuttle-trip-cost': 'تكلفة الرحلة',
        'kpi-shuttle-occupancy-rate': 'معدل الإشغال',
        'kpi-shuttle-complaints': 'عدد الشكاوى',
        'kpi-shuttle-ops-completion': 'نسبة إنجاز التشغيل',
        'kpi-makkah-tour-visitors': 'عدد الزوار',
        'kpi-makkah-tour-tours': 'عدد الجولات المنفذة',
        'kpi-makkah-tour-satisfaction': 'نسبة رضا العملاء',
        'kpi-makkah-tour-revenue': 'الإيرادات (مليون ر.س)',
        'kpi-makkah-tour-booking-rate': 'معدل الحجوزات',
        'kpi-makkah-tour-active-guides': 'عدد المرشدين النشطين',
        'kpi-makkah-tour-plan-adherence': 'الالتزام بالخطة التشغيلية',
        'kpi-makkah-tour-remarks-complaints': 'عدد الملاحظات والشكاوى',
        'chart-shuttle-trips': 'أداء الرحلات اليومية (الفعلي vs المستهدف)',
        'chart-shuttle-occupancy': 'معدل إشغال الحافلات اليومي',
        'chart-makkah-tour-revenue': 'نمو الإيرادات الشهري (مليون ر.س)',
        'chart-makkah-tour-demographics': 'توزيع جنسيات الزوار والمستفيدين',
        'unit-million-sar': 'مليون ر.س',
        'unit-million': 'مليون',
        'val-card1-rev': '142.5 مليون',
        'val-card2-rev': '89.5 مليون',
        'val-card1-excellent': '18 ممتاز',
        'val-card1-good': '3 جيد',
        'val-card1-poor': '1 ضعيف',
        'val-card2-excellent': '9 ممتاز',
        'val-card2-good': '2 جيد',
        'val-card2-poor': '1 ضعيف',
        'exec-summary-badge': 'لوحة القيادة والمؤشرات التنفيذية للرئاسة التنفيذية',
        'exec-summary-title': 'موجز الإدارة التنفيذية والتحليل الذكي',
        'feed-item-1-title': 'نمو الإيرادات والأداء المالي',
        'feed-item-1-desc': 'ارتفعت إيرادات الشركة الإجمالية بمعدل 12% مقارنة بالشهر السابق لتصل إلى 142.5 مليون ر.س بدعم قوي من إدارة العقود والاتفاقيات.',
        'feed-item-2-title': 'كفاءة تشغيل حافلات النقل التخصصي',
        'feed-item-2-desc': 'سجل معدل كفاءة استغلال الأسطول في مسارات مكة-المدينة زيادة تتجاوز المستهدف بنسبة 8% خلال الفترة الماضية.',
        'feed-item-3-title': 'كفاءه تشغيل شركه العمره والسياحه',
        'feed-item-3-desc': 'سجلت عوائد خدمات إقامة المعتمرين وحجوزات الفنادق قفزة بنمو 15% نتيجة للشراكات الاستراتيجية.',
        'feed-item-4-title': 'تنبيهات الإدارة والمتابعة',
        'feed-item-4-desc': 'يرجى الانتباه إلى أن بعض مؤشرات الأداء بالفرع التجاري تواجه تباطؤاً طفيفاً وتتطلب مراجعة من الإدارة التشغيلية.',
        'label-total-company-revenue': 'إجمالي إيرادات الشركة',
        'label-kpi-achievement-rate': 'نسبة إنجاز مؤشرات الأداء',
        'label-avg-health-indicators': 'متوسط الصحة الكلية للمؤشرات',
        'exec-summary-rev-val': '142.5 مليون ر.س',
        'exec-summary-rev-sub': '+12% مقارنة بالسابق',
        'exec-summary-achieve-sub': 'أداء مستهدف ممتاز',
        'desc-perf-health-excellent': 'صحة الأداء ممتازة 🟢',
        'exec-top-revenue': 'إجمالي الإيرادات',
        'exec-top-growth': 'معدل النمو',
        'exec-top-achievement': 'نسبة تحقيق المستهدف',
        'exec-top-transactions': 'إجمالي العمليات',
        'group-finance-title': 'الإدارة المالية',
        'card-rev-growth-title': 'إجمالي الإيرادات ومعدل النمو',
        'card-ebitda-title': 'هامش EBITDA التشغيلي',
        'card-cashflow-title': 'التفوق النقدى التشغيلي',
        'card-roa-title': 'العائد على الأصول ROA',
        'group-commercial-title': 'الإدارة التجارية والعملاء',
        'card-cust-ret-title': 'نسبة الاحتفاظ بالعملاء',
        'card-nps-title': 'صافي نقاط رضا العملاء NPS',
        'card-new-contracts-title': 'عدد العقود الاستراتيجية الجديدة',
        'group-ops-title': 'إدارة العمليات وأسطول الحافلات',
        'card-ops-plan-title': 'الالتزام بالخطة التشغيلية',
        'card-fleet-ready-title': 'نسبة جاهزية أسطول الحافلات',
        'card-fleet-util-title': 'نسبة استغلال أسطول مقاعد الحافلات',
        'group-support-title': 'مؤشرات الموارد البشرية، الـ HSE، والتحول الرقمي المسانده',
        'support-hr-title': 'إدارة الموارد البشرية والتحول الرقمي',
        'val-hr-ret-label': 'معدل الاحتفاظ بالموظفين الكوادر',
        'val-it-autom-label': 'تنفيذ مشاريع التحول الرقمي وأتمتة الورش',
        'val-critical-succession-label': 'خطط الإحلال والتعاقب للوظائف الحرجة',
        'val-saudization-label': 'نسبة التوطين والسعوده بالشركة',
        'support-hse-title': 'إدارة السلامة HSE والامتثال والتدقيق',
        'val-hse-ltifr-label': 'معدل حوادث العمل LTIFR',
        'val-hse-accidents-label': 'حوادث جسيمة للحافلات بالطرق',
        'val-audit-comp-label': 'نسبة الامتثال للوائح والتراخيص',
        'group-strategy-perf-title': 'إدارة الاستراتيجية والمشاريع PMO والحوكمة',
        'support-strategy-title': 'الاستراتيجية والمشاريع',
        'val-strat-goals-label': 'تحقيق أهداف الاستراتيجية والتوسع',
        'val-strat-init-label': 'معدل إنجاز مبادرات مكتب PMO',
        'support-risk-gov-title': 'إدارة المخاطر والحوكمة',
        'val-risk-handling-label': 'نسبة معالجة المخاطر المؤسسية',
        'val-gov-maturity-label': 'مستوى تطبيق حوكمة الشركات',
        'val-strat-goals-achieve-label': 'نسبة تحقيق الأهداف الاستراتيجية الموحدة',
        'group-service-visa-title': 'مؤشرات خدمة إصدار التأشيرات',
        'card-visa-processing-time-title': 'وقت معالجة التأشيرات',
        'card-visa-approval-rate-title': 'نسبة قبول التأشيرات',
        'card-visa-count-title': 'عدد التأشيرات المصدرة',
        'group-service-hotels-title': 'مؤشرات خدمة حجز وإقامة الفنادق',
        'card-hotel-occupancy-title': 'نسبة إشغال الفنادق',
        'card-hotel-cancel-rate-title': 'معدل إلغاء الحجوزات',
        'card-hotel-rating-title': 'تقييم رضا النزلاء عن الإقامة',
        'group-service-transport-title': 'مؤشرات خدمة نقل المعتمرين',
        'card-pilgrim-ops-plan-title': 'الالتزام بجدول نقل المعتمرين',
        'card-pilgrim-safety-rate-title': 'معدل السلامة في نقل المعتمرين',
        'card-pilgrim-shuttle-util-title': 'نسبة تشغيل حافلات المعتمرين',
        'group-service-hospitality-title': 'مؤشرات خدمة الضيافة',
        'card-meal-delivery-ontime-title': 'التزام تسليم الوجبات في الوقت',
        'card-food-safety-compliance-title': 'الامتثال لمعايير سلامة الأغذية',
        'card-hospitality-satisfaction-title': 'رضا المعتمرين عن خدمات الضيافة',
        'dept-contracts-title': 'إدارة العقود والاتفاقيات',
        'dept-contracts-desc': 'توقيع العقود الاستراتيجية والاتفاقيات التجارية والاحتفاظ بالعملاء والامتثال للسياسات.',
        'dept-hajj-title': 'إدارة الحج والعمرة للنقل',
        'dept-hajj-desc': 'تفويج ونقل ضيوف الرحمن والتزام مسارات التشغيل وجاهزية الأسطول والأمن والسلامة.',
        'dept-tourism-title': 'ادارة السياحة',
        'dept-tourism-desc': 'تنظيم وإدارة البرامج السياحية والرحلات وحجوزات الفنادق لزوار بيت الله الحرام.',
        'dept-ops-title': 'ادارة العمليات',
        'dept-ops-desc': 'الالتزام بالخطة التشغيلية اليومية للحافلات، وتوجيه المسارات، ومتابعة الرحلات التشغيلية.',
        'dept-commercial-title': 'الادارة التجارية',
        'dept-commercial-desc': 'متابعة الفرع التجاري ومبيعات وعقود النقل التخصصي ورضا العملاء NPS ونسب الاحتفاظ بالشركاء.',
        'dept-fleet-title': 'ادارة الاسطول',
        'dept-fleet-desc': 'متابعة جاهزية أسطول الحافلات اليومية ونسب استغلال المقاعد وجداول الصيانة الدورية.',
        'dept-support-title': 'ادارة خدمات الدعم (الموارد البشرية، تقنية المعلومات، المشتريات وخدمات الدعم )',
        'dept-support-desc': 'الموارد البشرية والتوظيف، البنية التحتية لتقنية المعلومات، مشتريات الشركة والخدمات اللوجستية.',
        'dept-finance-title': 'الادارة المالية',
        'dept-finance-desc': 'الإيرادات والربحية والتدفقات النقدية التشغيلية والعائد الكلي على الأصول المالية.',
        'dept-strategy-title': 'والاستراتيجية والاداء',
        'dept-strategy-desc': 'تحقيق الأهداف الاستراتيجية، مبادرات مكتب إدارة المشاريع PMO، ومتابعة نضج الأداء المؤسسي.',
        'dept-audit-title': 'التدقيق الداخلي',
        'dept-audit-desc': 'أعمال التدقيق الداخلي، مراجعة العمليات والسياسات، وتقييم الحوكمة والامتثال الإداري.',
        'dept-hse-title': 'الصحة والسلامة والبيئة',
        'dept-hse-desc': 'معدل الحوادث المرورية والصناعية، الالتزام باللوائح والتعليمات، والسلامة العامة على الطرق.',
        'card-ops-d-15-title': 'زمن استبدال الحافلات في حالة عطل',
        'card-ops-d-16-title': 'زمن إخلاء المحطات',
        'card-ops-d-17-title': 'معدل تغيب السائقين',
        'card-ops-d-18-title': 'الالتزام بعدد المشغلين',
        'card-ops-d-19-title': 'الالتزام بالزي الرسمي',
        'card-ops-d-20-title': 'الاستجابة للأعطال',
        'card-ops-d-21-title': 'زمن الاستجابة للأعطال في المحطات والمواقف',
        'card-ops-d-22-title': 'زمن الاستجابة للأعطال في المسارات الداخلية',
        'card-ops-d-23-title': 'زمن الاستجابة للأعطال في المسارات الخارجية',
        'card-ops-d-24-title': 'الالتزام بمعيار التعاقد',
        'card-ops-d-25-title': 'الالتزام بالطاقة الاستيعابية',
        'card-ops-d-26-title': 'الالتزام بعدد الحافلات',
        'card-ops-d-27-title': 'اللوحات الإرشادية',
        'card-ops-d-28-title': 'اللوحات التشغيلية',
        'card-ops-d-29-title': 'الالتزام بعدم دخول الحافلات غير المصرح لها',
        'card-ops-d-30-title': 'توفر الحراسات',
        'card-ops-d-31-title': 'الحافلات المؤهلة',
        'card-ops-d-32-title': 'الحافلات حسب التتبع',
        'card-com-d-10-title': 'الامتثال لتنظيف الأسطول',
        'card-hse-d-15-title': 'أداء السائقين',
        'dept-kpi-count-5': '5 مؤشرات أداء',
        'dept-kpi-count-4': '4 مؤشرات أداء',
        'dept-kpi-count-3': '3 مؤشرات أداء',
        'dept-kpi-count-2': '2 مؤشر أداء',
        'card-visa-integration-uptime-title': 'جاهزية نظام الربط الإلكتروني',
        'card-visa-data-error-rate-title': 'معدل أخطاء إدخال البيانات',
        'card-visa-complaints-rate-title': 'معدل شكاوى التأشيرات',
        'card-hotel-average-room-rate-title': 'متوسط سعر الغرفة الفندقية',
        'card-hotel-overbooking-incidents-title': 'حالات الحجز الزائد',
        'card-hotel-contract-compliance-title': 'امتثال الفنادق للعقود',
        'card-pilgrim-bus-maintenance-adherence-title': 'الالتزام بصيانة حافلات المعتمرين',
        'card-pilgrim-trip-duration-title': 'متوسط زمن الرحلة (مكة-المدينة)',
        'card-pilgrim-satisfaction-title': 'رضا المعتمرين عن النقل',
        'card-meal-waste-percentage-title': 'نسبة الهدر في الوجبات',
        'card-hospitality-staff-compliance-title': 'امتثال موظفي الضيافة',
        'card-hospitality-complaints-title': 'شكاوى خدمات الإعاشة',
        'card-contracts-renewal-rate-title': 'معدل تجديد العقود والاتفاقيات',
        'card-contracts-turnaround-time-title': 'متوسط زمن توقيع العقود',
        'card-contracts-legal-disputes-title': 'النزاعات القانونية النشطة',
        'card-hajj-driver-adherence-title': 'التزام السائقين بالخطة',
        'card-hajj-fuel-efficiency-title': 'كفاءة استهلاك الوقود للأسطول',
        'card-hajj-safety-training-rate-title': 'نسبة التدريب على السلامة',
        'card-rental-fleet-utilization-title': 'معدل استغلال حافلات التأجير',
        'card-rental-revenue-per-bus-title': 'الإيراد اليومي للحافلة المؤجرة',
        'card-rental-contract-satisfaction-title': 'رضا العملاء عن خدمات التأجير',
        'card-rental-maintenance-adherence-title': 'صيانة حافلات التأجير والتشغيل',
        'card-rental-safety-compliance-title': 'الامتثال للسلامة بالتأجير',
        'card-rental-active-contracts-title': 'عدد عقود التأجير والتشغيل النشطة',
        'sect-trans-services-title': 'خدمات القطاع',
        'sect-trans-services-desc': 'العقود والاتفاقيات، نقل الحجاج، نقل المعتمرين، وخدمات الإيجار والتشغيل.',
        'sect-trans-depts-title': 'كافة الإدارات',
        'sect-trans-depts-desc': 'إدارات النقل التخصصي المساندة والتشغيلية الموحدة.',
        'service-contracts-title': 'خدمة العقود والاتفاقيات',
        'service-hajj-title': 'خدمة نقل الحجاج',
        'service-hajj-desc': 'تفويج ونقل الحجاج والتزام مسارات التشغيل وجاهزية الأسطول والأمن والسلامة للحج.',
        'service-umrah-title': 'خدمة نقل المعتمرين',
        'service-umrah-desc': 'تفويج ونقل المعتمرين والتزام مسارات التشغيل وجاهزية الأسطول والأمن والسلامة للعمرة.',
        'service-leasing-title': 'خدمة التاجير والتشغيل '
    },
    'en': {
        'langToggleText': 'العربية (AR)',
        'company-name-main': 'Rawahel Al-Mashaer Co.',
        'company-desc-main': 'Unified Executive & Monitoring Portal for Rawahel Al-Mashaer Specialized Transportation, Operations & Logistics.',
        'label-group-revenue': 'Total Group Revenue',
        'label-group-growth': 'Combined Growth Rate',
        'label-group-achievement': 'Target Achievement Rate',
        'card-general-info-title': 'General Information & Executive Analysis',
        'card-general-info-desc': 'High-level executive summary of specialized transportation, tourism, and hospitality sectors, representing the main monitoring gateway.',
        'label-summary': 'Summary Dashboard',
        'trend-stable': 'Upward Performance 📈',
        'trend-accelerating': 'Accelerating Growth 🚀',
        'company-sectors-title': 'Rawahel Al-Mashaer Sectors',
        'btn-back-overview': 'Back to Overview',
        'dept-compliance-title': 'Compliance Department',
        'dept-compliance-desc': 'Monitoring operational compliance, internal policies & procedures, contract obligations, and resolving violations.',
        'dept-kpi-count-10': '10 Performance Indicators',
        'dept-projects-title': 'Project Management',
        'dept-projects-desc': 'Monitoring and analyzing strategic and operational projects performance, including Shuttle Transport and Makkah Tour.',
        'dept-projects-count-2': '2 Projects',
        'btn-back-depts': 'Back to Departments',
        'kpi-comp-ops-rate': 'Operational Compliance Rate',
        'kpi-comp-violations-count': 'Registered Violations Count',
        'kpi-comp-closure-rate': 'Violations Closure Rate',
        'kpi-comp-resolution-time': 'Average Resolution Time',
        'kpi-comp-contract-rate': 'Contract Compliance Rate',
        'kpi-comp-policies-rate': 'Policies & Procedures Adherence',
        'kpi-comp-audit-results': 'Internal Audit Results',
        'kpi-comp-critical-findings': 'Critical Findings Count',
        'kpi-comp-monthly-rate': 'Monthly Compliance Rate',
        'kpi-comp-improvement-rate': 'Continuous Improvement Rate',
        'chart-compliance-trend': 'Monthly Compliance Trend Analysis (Last 6 Months)',
        'chart-compliance-distribution': 'Compliance Indicators Distribution',
        'table-compliance-tracking': 'Historical Performance Tracking & Monthly Compliance Table',
        'project-shuttle-title': 'Shuttle Transport Project',
        'project-makkah-tour-title': 'Makkah Tour Project',
        'project-shuttle-detail-title': 'Shuttle Transport Project - Operational Analysis',
        'project-makkah-tour-detail-title': 'Makkah Tour Project - Operational Analysis',
        'kpi-shuttle-beneficiaries': 'Total Beneficiaries',
        'kpi-shuttle-trips': 'Executed Trips',
        'kpi-shuttle-schedule-adherence': 'Schedule Adherence Rate',
        'kpi-shuttle-satisfaction': 'Beneficiaries Satisfaction',
        'kpi-shuttle-trip-cost': 'Average Trip Cost',
        'kpi-shuttle-occupancy-rate': 'Average Occupancy Rate',
        'kpi-shuttle-complaints': 'Complaints Count',
        'kpi-shuttle-ops-completion': 'Operational Completion Rate',
        'kpi-makkah-tour-visitors': 'Total Visitors',
        'kpi-makkah-tour-tours': 'Executed Tours',
        'kpi-makkah-tour-satisfaction': 'Customers Satisfaction',
        'kpi-makkah-tour-revenue': 'Revenue (Million SAR)',
        'kpi-makkah-tour-booking-rate': 'Booking Rate',
        'kpi-makkah-tour-active-guides': 'Active Guides Count',
        'kpi-makkah-tour-plan-adherence': 'Operational Plan Adherence',
        'kpi-makkah-tour-remarks-complaints': 'Remarks & Complaints Count',
        'chart-shuttle-trips': 'Daily Trips Performance (Actual vs Target)',
        'chart-shuttle-occupancy': 'Daily Bus Occupancy Rate',
        'chart-makkah-tour-revenue': 'Monthly Revenue Growth (Million SAR)',
        'chart-makkah-tour-demographics': 'Visitors Nationalities Distribution',
        'sidebar-logo-text': 'Rawahel Al Mashaer Co.',
        'sidebar-business-areas': 'Core Business Departments',
        'sidebar-company-depts': 'Company Departments',
        'nav-overview': 'Overview Dashboard',
        'nav-transportation': 'Specialized Transportation',
        'nav-pilgrim-services': 'Tourism & Pilgrim Services',
        'show-all-departments': 'Show All Departments',
        'sidebar-settings': 'KPI Target Settings',
        'sidebar-copyright': 'Rawahel Standard Approved System © 2026',
        'header-title': 'Performance Monitoring System for Rawahel Al Mashaer Co.',
        'header-subtitle': 'Live interactive dashboard aligned with Rawahel corporate brand identity',
        'header-ceo-name': 'Ghassan Iraqi',
        'header-ceo-role': 'General Manager (CEO)',
        'ticker-perf-label': 'Rawahel Overall Performance:',
        'ticker-perf-desc': 'All departments average completion rate records',
        'ticker-may': 'for the month of May.',
        'ticker-revenue-label': 'Revenue Growth:',
        'ticker-revenue-desc': 'Achieved growth of',
        'ticker-ebitda-label': 'Operating EBITDA Margin:',
        'ticker-ebitda-desc': 'Balanced financial performance recording',
        'ticker-fleet-label': 'Current Fleet Readiness:',
        'ticker-fleet-desc': 'Active operational buses readiness rises to',
        'ticker-fleet-total': '(Total 1,240 buses).',
        'ticker-nps-label': 'Customer Satisfaction NPS:',
        'ticker-nps-desc': 'Pilgrim satisfaction points score',
        'ticker-ops-label': 'Ops Plan Commitment:',
        'ticker-ops-desc': 'Bus transport route schedule commitment reached',
        'summary-badge': 'Unified Performance Overview',
        'summary-title': 'Performance Indicators Matrix for Rawahel Al Mashaer Co.',
        'summary-desc': 'Choose one of the business departments from the sidebar to inspect detailed performance.',
        'summary-total': 'Total KPIs',
        'summary-excellent': 'Excellent 🟢',
        'summary-good': 'Good 🟡',
        'summary-bad': 'Poor 🔴',
        'summary-avg-label': 'Combined Financial & Operational Performance Averages',
        'overview-sector-perf': 'Department Performance Average',
        'chart-flags-title': 'Distribution of Current Evaluation Indicators (Flags)',
        'logout': 'Logout',
        'role-superadmin': 'General Manager',
        'role-admin': 'System Administrator',
        'role-manager': 'Department Manager',
        'role-user': 'Department User',
        'card-transport-desc': 'Managing the approved organizational structure, bus transportation/operations, Hajj & Umrah contracts, commercial agreements, and supporting company departments.',
        'card-pilgrim-desc': 'Managing packages and services for pilgrims, including visa issuance, hotel bookings, pilgrim transportation, and integrated hospitality.',
        'label-total-revenue': 'Total Revenue',
        'label-growth-rate': 'Growth Rate',
        'label-achievement-rate': 'Achievement Rate',
        'status-excellent': 'Excellent',
        'status-good': 'Good',
        'status-poor': 'Poor',
        'status-locked': 'Locked',
        'trend-ascending': 'Ascending 📈',
        'trend-accelerated': 'Accelerating 🚀',
        'btn-access-portal': 'Access Portal',
        'btn-locked-portal': 'Restricted Access',
        'unit-million-sar': 'M SAR',
        'unit-million': 'M',
        'val-card1-rev': '142.5 M',
        'val-card2-rev': '89.5 M',
        'val-card1-excellent': '18 Excellent',
        'val-card1-good': '3 Good',
        'val-card1-poor': '1 Poor',
        'val-card2-excellent': '9 Excellent',
        'val-card2-good': '2 Good',
        'val-card2-poor': '1 Poor',
        'exec-summary-badge': 'Executive Dashboard & Performance Indicators',
        'exec-summary-title': 'Executive Management Summary & Smart Analytics',
        'feed-item-1-title': 'Revenue Growth & Financial Performance',
        'feed-item-1-desc': 'Total company revenues increased by 12% compared to the previous month, reaching 142.5 million SAR, with strong support from the Contracts and Agreements Department.',
        'feed-item-2-title': 'Specialized Transport Fleet Efficiency',
        'feed-item-2-desc': 'The fleet utilization rate on the Makkah-Madinah routes recorded an increase exceeding the target by 8% during the past period.',
        'feed-item-3-title': 'Umrah & Tourism Company Efficiency',
        'feed-item-3-desc': 'Revenue from pilgrim accommodation services and hotel bookings jumped by 15% as a result of strategic partnerships.',
        'feed-item-4-title': 'Management & Follow-up Alerts',
        'feed-item-4-desc': 'Please note that some performance indicators for the commercial branch are facing a slight slowdown and require review by operational management.',
        'label-total-company-revenue': 'Total Company Revenue',
        'label-kpi-achievement-rate': 'KPI Achievement Rate',
        'label-avg-health-indicators': 'Average Overall Indicator Health',
        'exec-summary-rev-val': '142.5 M SAR',
        'exec-summary-rev-sub': '+12% vs previous',
        'exec-summary-achieve-sub': 'Excellent Target Performance',
        'desc-perf-health-excellent': 'Performance Health is Excellent 🟢',
        'dept-contracts-title': 'Contracts & Agreements',
        'dept-contracts-desc': 'Signing strategic contracts, commercial agreements, retaining customers, and compliance with policies.',
        'dept-hajj-title': 'Hajj & Umrah Transport',
        'dept-hajj-desc': 'Grouping and transporting pilgrims, commitment to operational routes, fleet readiness, and safety.',
        'dept-tourism-title': 'Tourism Department',
        'dept-tourism-desc': 'Organizing and managing tourism programs, trips, and hotel bookings for visitors.',
        'dept-ops-title': 'Operations Department',
        'dept-ops-desc': 'Commitment to the daily bus operational plan, route routing, and operational trip monitoring.',
        'dept-commercial-title': 'Commercial Department',
        'dept-commercial-desc': 'Monitoring the commercial branch, specialized transport sales and contracts, customer satisfaction NPS, and partner retention rates.',
        'dept-fleet-title': 'Fleet Department',
        'dept-fleet-desc': 'Monitoring daily bus fleet readiness, seat utilization rates, and periodic maintenance schedules.',
        'dept-support-title': 'Support Services Department (HR, IT, Procurement & Support)',
        'dept-support-desc': 'Human resources and recruitment, IT infrastructure, company procurement, and logistics.',
        'dept-finance-title': 'Financial Department',
        'dept-finance-desc': 'Revenues, profitability, operating cash flows, and overall return on financial assets.',
        'dept-strategy-title': 'Strategy & Performance Department',
        'dept-strategy-desc': 'Achieving strategic objectives, PMO initiatives, and monitoring institutional performance maturity.',
        'dept-audit-title': 'Internal Audit Department',
        'dept-audit-desc': 'Internal audit activities, review of processes and policies, and evaluation of corporate governance and compliance.',
        'dept-hse-title': 'Health, Safety & Environment (HSE)',
        'dept-hse-desc': 'Traffic and industrial accident rates, compliance with regulations and instructions, and public safety on roads.',
        'card-ops-d-15-title': 'Bus Replacement Time (Breakdown)',
        'card-ops-d-16-title': 'Station Evacuation Time',
        'card-ops-d-17-title': 'Driver Absence Rate',
        'card-ops-d-18-title': 'Operators Count Adherence',
        'card-ops-d-19-title': 'Uniform Dress Code Compliance',
        'card-ops-d-20-title': 'Breakdown Response Time',
        'card-ops-d-21-title': 'Breakdown Response (Stations & Parking)',
        'card-ops-d-22-title': 'Breakdown Response (Internal Routes)',
        'card-ops-d-23-title': 'Breakdown Response (External Routes)',
        'card-ops-d-24-title': 'Contract Standard Adherence',
        'card-ops-d-25-title': 'Capacity Limit Adherence',
        'card-ops-d-26-title': 'Buses Count Adherence',
        'card-ops-d-27-title': 'Directional Signs Adherence',
        'card-ops-d-28-title': 'Operational Signs Adherence',
        'card-ops-d-29-title': 'Unauthorized Bus Entry Prevention',
        'card-ops-d-30-title': 'Security Guards Availability',
        'card-ops-d-31-title': 'Qualified Buses Rate',
        'card-ops-d-32-title': 'Buses Tracking Coverage',
        'card-com-d-10-title': 'Fleet Cleaning Compliance',
        'card-hse-d-15-title': 'Drivers Safety Performance',
        'dept-kpi-count-5': '5 KPIs',
        'dept-kpi-count-4': '4 KPIs',
        'dept-kpi-count-3': '3 KPIs',
        'dept-kpi-count-2': '2 KPIs',
        'card-visa-integration-uptime-title': 'System Link Integration Uptime',
        'card-visa-data-error-rate-title': 'Data Entry Error Rate',
        'card-visa-complaints-rate-title': 'Visa Service Complaints Rate',
        'card-hotel-average-room-rate-title': 'Average Room Rate',
        'card-hotel-overbooking-incidents-title': 'Overbooking Incidents Count',
        'card-hotel-contract-compliance-title': 'Hotel Contract Terms Compliance',
        'card-pilgrim-bus-maintenance-adherence-title': 'Pilgrim Bus Maintenance Adherence',
        'card-pilgrim-trip-duration-title': 'Average Trip Duration (Makkah-Madinah)',
        'card-pilgrim-satisfaction-title': 'Pilgrim Satisfaction with Transport',
        'card-meal-waste-percentage-title': 'Meal Waste Percentage',
        'card-hospitality-staff-compliance-title': 'Hospitality Staff Code Compliance',
        'card-hospitality-complaints-title': 'Catering Complaints Count',
        'card-contracts-renewal-rate-title': 'Contract Renewal Rate',
        'card-contracts-turnaround-time-title': 'Contract Signing Turnaround',
        'card-contracts-legal-disputes-title': 'Active Legal Disputes',
        'card-hajj-driver-adherence-title': 'Driver Route Schedule Adherence',
        'card-hajj-fuel-efficiency-title': 'Fleet Fuel Consumption Efficiency',
        'card-hajj-safety-training-rate-title': 'Drivers Safety Training Coverage',
        'card-rental-fleet-utilization-title': 'Rental Fleet Seat Utilization',
        'card-rental-revenue-per-bus-title': 'Rental Revenue per Bus',
        'card-rental-contract-satisfaction-title': 'Rental Clients Satisfaction',
        'card-rental-maintenance-adherence-title': 'Rental Fleet Maintenance Adherence',
        'card-rental-safety-compliance-title': 'Rental Safety & Compliance Rate',
        'card-rental-active-contracts-title': 'Active Rental/Ops Contracts',
        'sect-trans-services-title': 'Sector Services',
        'sect-trans-services-desc': 'Contracts & Agreements, Hajj Transport, Umrah Transport, and Rental & Operations.',
        'sect-trans-depts-title': 'All Departments',
        'sect-trans-depts-desc': 'Support and operational departments for Specialized Transportation.',
        'service-contracts-title': 'service Contracts & Agreements',
        'service-hajj-title': 'Hajj Transport Service',
        'service-hajj-desc': 'Monitoring Hajj pilgrim transport scheduling, route compliance, fleet readiness, and driver safety.',
        'service-umrah-title': 'Umrah Transport Service',
        'service-umrah-desc': 'Monitoring Umrah pilgrim transport scheduling, route compliance, fleet readiness, and passenger safety.',
        'service-leasing-title': 'service Rental & Operations Services'
    }
};

// safe text helper function
function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

// language toggle and apply
function toggleLanguage() {
    const currentLang = document.documentElement.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
    localStorage.setItem('lang', currentLang);
}

function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
    
    const dictionary = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dictionary[key]) el.innerText = dictionary[key];
    });
    
    const langTextEl = document.getElementById('langToggleText');
    if (langTextEl) langTextEl.innerText = lang === 'en' ? 'العربية (AR)' : 'English (EN)';
    
    if (typeof Chart !== 'undefined') {
        const fontName = lang === 'en' ? 'Outfit' : 'Tajawal';
        if (window.flagsPieChart) {
            window.flagsPieChart.options.plugins.legend.labels.font.family = fontName;
            window.flagsPieChart.data.labels = lang === 'en' ? ['Excellent 🟢', 'Good 🟡', 'Poor 🔴'] : ['ممتاز 🟢', 'جيد 🟡', 'ضعيف 🔴'];
            window.flagsPieChart.update();
        }
    }
    
    // Update view titles if dynamic view is active
    if (window.currentView && (window.currentView.startsWith('dept-') || window.currentView.startsWith('service-') || ['contracts', 'hajj', 'leasing'].includes(window.currentView))) {
        const titleText = document.getElementById('view-kpi-title-text');
        const breadcrumbCurrent = document.getElementById('breadcrumb-current');
        let deptNameAr = '';
        let deptNameEn = '';
        if (window.currentView === 'contracts') {
            deptNameAr = 'إدارة العقود والاتفاقيات';
            deptNameEn = 'Contracts & Agreements';
        } else if (window.currentView === 'hajj') {
            deptNameAr = 'إدارة الحج والعمرة للنقل';
            deptNameEn = 'Hajj & Umrah Transport';
        } else if (window.currentView === 'dept-tourism') {
            deptNameAr = 'ادارة السياحة';
            deptNameEn = 'Tourism Department';
        } else if (window.currentView === 'dept-ops') {
            deptNameAr = 'ادارة العمليات';
            deptNameEn = 'Operations Department';
        } else if (window.currentView === 'dept-commercial') {
            deptNameAr = 'الادارة التجارية';
            deptNameEn = 'Commercial Department';
        } else if (window.currentView === 'dept-fleet') {
            deptNameAr = 'ادارة الاسطول';
            deptNameEn = 'Fleet Department';
        } else if (window.currentView === 'dept-support') {
            deptNameAr = 'ادارة خدمات الدعم (الموارد البشرية، تقنية المعلومات، المشتريات وخدمات الدعم )';
            deptNameEn = 'Support Services Department (HR, IT, Procurement & Support)';
        } else if (window.currentView === 'dept-finance') {
            deptNameAr = 'الادارة المالية';
            deptNameEn = 'Financial Department';
        } else if (window.currentView === 'dept-strategy') {
            deptNameAr = 'والاستراتيجية والاداء';
            deptNameEn = 'Strategy & Performance Department';
        } else if (window.currentView === 'dept-audit') {
            deptNameAr = 'التدقيق الداخلي';
            deptNameEn = 'Internal Audit Department';
        } else if (window.currentView === 'dept-hse') {
            deptNameAr = 'الصحة والسلامة والبيئة';
            deptNameEn = 'Health, Safety & Environment (HSE)';
        } else if (window.currentView === 'service-visa') {
            deptNameAr = 'خدمة إصدار التأشيرات';
            deptNameEn = 'Visa Issuance Service';
        } else if (window.currentView === 'service-hotels') {
            deptNameAr = 'خدمة حجز وإقامة الفنادق';
            deptNameEn = 'Hotel Booking & Accommodation';
        } else if (window.currentView === 'service-transport') {
            deptNameAr = 'خدمة نقل المعتمرين';
            deptNameEn = 'Pilgrim Transport Service';
        } else if (window.currentView === 'service-hospitality') {
            deptNameAr = 'خدمة الضيافة';
            deptNameEn = 'Hospitality & Catering Service';
        } else if (window.currentView === 'service-contracts') {
            deptNameAr = 'خدمة العقود والاتفاقيات';
            deptNameEn = 'Contracts & Agreements Service';
        } else if (window.currentView === 'service-hajj-transport') {
            deptNameAr = 'خدمة نقل الحجاج';
            deptNameEn = 'Hajj Transport Service';
        } else if (window.currentView === 'service-umrah-transport') {
            deptNameAr = 'خدمة نقل المعتمرين';
            deptNameEn = 'Umrah Transport Service';
        } else if (window.currentView === 'service-leasing') {
            deptNameAr = 'خدمة التأجير والتشغيل';
            deptNameEn = 'Rental & Operations Service';
        }
        const currentName = lang === 'en' ? deptNameEn : deptNameAr;
        if (titleText) titleText.innerText = currentName;
        if (breadcrumbCurrent) breadcrumbCurrent.innerText = currentName;
    } else if (window.currentView === 'departments') {
        document.getElementById('header-main-title').innerText = lang === 'en' ? 'Company Departments' : 'كافة إدارات شركة رواحل';
    } else if (window.currentView === 'overview') {
        document.getElementById('header-main-title').innerText = lang === 'en' ? 'Performance Monitoring Dashboard' : 'نظام مراقبة الأداء لشركة رواحل المشاعر';
    }
    
    if (window.simulateKpiData) window.simulateKpiData(true);
}

// Modal handling
function openProfileModal() {
    const modal = document.getElementById('profileModal');
    const overlay = document.getElementById('profileModalOverlay');
    const box = document.getElementById('profileModalBox');
    if (modal && overlay && box) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            box.classList.remove('scale-90', 'opacity-0');
            box.classList.add('scale-100', 'opacity-100');
        }, 50);
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    const overlay = document.getElementById('profileModalOverlay');
    const box = document.getElementById('profileModalBox');
    if (modal && overlay && box) {
        box.classList.remove('scale-100', 'opacity-100');
        box.classList.add('scale-90', 'opacity-0');
        overlay.classList.add('opacity-0');
        setTimeout(() => { modal.classList.add('hidden'); }, 300);
    }
}

function openKpiGroupModal(flagType) {
    const isEn = document.documentElement.lang === 'en';
    let title = '';
    let indicatorClass = '';

    if (flagType === 'all') {
        title = isEn ? 'All Performance Indicators' : 'جميع مؤشرات الأداء';
        indicatorClass = 'bg-blue-500';
    } else if (flagType === 'excellent') {
        title = isEn ? 'Excellent Performance KPIs 🟢' : 'مؤشرات الأداء الممتاز 🟢';
        indicatorClass = 'bg-emerald-500 animate-pulse';
    } else if (flagType === 'good') {
        title = isEn ? 'Good Performance KPIs 🟡' : 'مؤشرات الأداء الجيد 🟡';
        indicatorClass = 'bg-amber-500';
    } else if (flagType === 'bad') {
        title = isEn ? 'Poor Performance KPIs 🔴' : 'مؤشرات الأداء الضعيف 🔴';
        indicatorClass = 'bg-red-500 animate-pulse';
    }

    const indicator = document.getElementById('kpiGroupIndicator');
    if (indicator) indicator.className = `w-2.5 h-2.5 rounded-full ${indicatorClass}`;

    const headerTitle = document.getElementById('kpiGroupHeaderTitle');
    if (headerTitle) headerTitle.innerText = title;

    const matchedItems = [];
    const valMap = {
        'rev-growth': parseFloat(document.getElementById('val-rev-growth').innerText.replace(/[^0-9.]/g, '')) || 0,
        'ebitda': window.RAWAHEL_DATA.ebitda,
        'cashflow': window.RAWAHEL_DATA.cashFlow,
        'roa': window.RAWAHEL_DATA.roa,
        'cust-ret': window.RAWAHEL_DATA.custRetention,
        'nps': window.RAWAHEL_DATA.nps,
        'new-contracts': window.RAWAHEL_DATA.newContracts,
        'ops-plan': window.RAWAHEL_DATA.opsPlan,
        'fleet-ready': window.RAWAHEL_DATA.fleetReady,
        'fleet-util': window.RAWAHEL_DATA.fleetUtil,
        'hr-ret': window.RAWAHEL_DATA.hrRetention,
        'it-autom': window.RAWAHEL_DATA.itAutomation,
        'critical-succession': window.RAWAHEL_DATA.criticalSuccession,
        'saudization': window.RAWAHEL_DATA.saudization,
        'hse-ltifr': window.RAWAHEL_DATA.ltifr,
        'hse-accidents': window.RAWAHEL_DATA.accidents,
        'audit-comp': window.RAWAHEL_DATA.auditCompliance,
        'strat-goals': window.RAWAHEL_DATA.strategicGoals,
        'strat-init': window.RAWAHEL_DATA.strategicInitiatives,
        'risk-handling': window.RAWAHEL_DATA.riskHandling,
        'gov-maturity': window.RAWAHEL_DATA.govMaturity,
        'strat-goals-achieve': window.RAWAHEL_DATA.stratGoalsAchieve,
        'visa-processing-time': parseFloat(document.getElementById('val-visa-processing-time')?.innerText) || 18.5,
        'visa-approval-rate': parseFloat(document.getElementById('val-visa-approval-rate')?.innerText) || 99.1,
        'visa-count': parseFloat(document.getElementById('val-visa-count')?.innerText.replace(/,/g, '')) || 16420,
        'hotel-occupancy': parseFloat(document.getElementById('val-hotel-occupancy')?.innerText) || 88.5,
        'hotel-cancel-rate': parseFloat(document.getElementById('val-hotel-cancel-rate')?.innerText) || 4.2,
        'hotel-rating': parseFloat(document.getElementById('val-hotel-rating')?.innerText) || 92.0,
        'pilgrim-ops-plan': parseFloat(document.getElementById('val-pilgrim-ops-plan')?.innerText) || 96.2,
        'pilgrim-safety-rate': parseFloat(document.getElementById('val-pilgrim-safety-rate')?.innerText) || 100,
        'pilgrim-shuttle-util': parseFloat(document.getElementById('val-pilgrim-shuttle-util')?.innerText) || 91.5,
        'meal-delivery-ontime': parseFloat(document.getElementById('val-meal-delivery-ontime')?.innerText) || 98.5,
        'food-safety-compliance': parseFloat(document.getElementById('val-food-safety-compliance')?.innerText) || 99.8,
        'hospitality-satisfaction': parseFloat(document.getElementById('val-hospitality-satisfaction')?.innerText) || 91.0
    };

    Object.keys(valMap).forEach(key => {
        const mainFlag = window.kpiCurrentFlags ? window.kpiCurrentFlags[key] : 'excellent';
        const currentValStr = document.getElementById(`val-${key}`) ? document.getElementById(`val-${key}`).innerText : valMap[key];

        if (flagType === 'all' || mainFlag === flagType) {
            let kpiName = key;
            const cardTitle = document.querySelector(`#card-${key} span[data-i18n]`) || document.querySelector(`div[onclick*="${key}"] span[data-i18n]`);
            if (cardTitle) kpiName = cardTitle.innerText;

            matchedItems.push({
                parentKey: key,
                title: kpiName,
                value: currentValStr,
                flag: mainFlag
            });
        }
    });

    const groupSubtitle = document.getElementById('kpiGroupSubtitle');
    if (groupSubtitle) {
        groupSubtitle.innerText = isEn ? `Showing ${matchedItems.length} KPIs in this category` : `تم العثور على ${matchedItems.length} مؤشر أداء`;
    }

    const listContainer = document.getElementById('kpiGroupList');
    if (listContainer) {
        listContainer.innerHTML = '';
        if (matchedItems.length === 0) {
            listContainer.innerHTML = `<div class="text-center text-xs text-slate-500 py-6">${isEn ? 'No KPIs found.' : 'لا توجد مؤشرات في هذه الفئة حالياً.'}</div>`;
        } else {
            matchedItems.forEach(item => {
                let badgeClass = "bg-slate-100 text-slate-700";
                let badgeIcon = "⚪";
                if (item.flag === 'excellent') {
                    badgeClass = "bg-emerald-100 text-emerald-700 border border-emerald-200";
                    badgeIcon = isEn ? "🟢 Excellent" : "🟢 ممتاز";
                } else if (item.flag === 'good') {
                    badgeClass = "bg-amber-100 text-amber-700 border border-amber-200";
                    badgeIcon = isEn ? "🟡 Good" : "🟡 جيد";
                } else if (item.flag === 'bad') {
                    badgeClass = "bg-rose-100 text-rose-700 border border-rose-200";
                    badgeIcon = isEn ? "🔴 Poor" : "🔴 ضعيف";
                }

                const itemHtml = `
                    <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between shadow-3xs">
                        <div class="text-start">
                            <span class="text-xs font-black text-slate-800 block">${item.title}</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-sm font-black text-slate-900 font-mono">${item.value}</span>
                            <span class="text-[9px] font-black px-2 py-0.5 rounded-full ${badgeClass}">${badgeIcon}</span>
                        </div>
                    </div>
                `;
                listContainer.innerHTML += itemHtml;
            });
        }
    }

    const modal = document.getElementById('kpiGroupModal');
    const overlay = document.getElementById('kpiGroupOverlay');
    const box = document.getElementById('kpiGroupBox');
    
    if (modal && overlay && box) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            box.classList.remove('scale-90', 'opacity-0');
            box.classList.add('scale-100', 'opacity-100');
        }, 50);
    }
}

function closeKpiGroupModal() {
    const modal = document.getElementById('kpiGroupModal');
    const overlay = document.getElementById('kpiGroupOverlay');
    const box = document.getElementById('kpiGroupBox');
    
    if (modal && overlay && box) {
        box.classList.remove('scale-100', 'opacity-100');
        box.classList.add('scale-90', 'opacity-0');
        overlay.classList.add('opacity-0');
        
        setTimeout(() => { modal.classList.add('hidden'); }, 300);
    }
}
