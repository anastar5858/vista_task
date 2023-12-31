# Requests Management System

A system encompassed by a back-end and front-end in two separated ecosystems, which a company could benefit from for managing their client requests, and shared between their employees.

## Link To Hosted App:

https://anastar5858.github.io/RMS-front/


## Brief Implementation Technologies:

For the front-end application, the React framework was used to facilitate and escalate the development of the UI. As for the back-end, Node.js was used along with the Express.js middleware framework for implementing the system Rest API. The storage solution used is the cloud-based MongoDB database, with a crawling aspect built via Puppeteer. End-to-end tests using Cypress & Integration tests via the testing library are available on the GitHub repo.

## Features:

- Simple CRUD (create, read, update, and delete) operations on requests.
- A registration and login system powered by both the database and express-sessions.
- A central dashboard for employees to view, update the status, and delete requests.
- Ability to fetch a unique background based on the user-inputted topic of a request (web crawling) (additional).
- Some fun animations for enhancing the vibrancy of the application (additional).
- The ability for site developers to publish demonstrations to help users walkthrough the features (additional).
- To add a demo add /assets/html/demo.html (experimental) to the URL, and it requires technical knowledge about the DOM.
- Instantaneous switching between Arabic (Saudi dialect) and English (localization) (additional).

## Challenge:

Building such a project in a week's time was rough, especially as some tools used were new to the developer, such as Cypress for testing. Docs Helped!!!

## Running Locally?
- Clone the repo.

**Front-End:**
Host using your favorite server (Apache) or simply use the Live Server Extension of Visual Studio Code.

**Back-End:**
1. Run `npm i` to install dependencies.
2. Run `npm start` to host on port 8080.
   *Make sure the port is not used by your front-end application or any other service.*

**Tests:**
Go to the directory e2e/integration tests, execute `npm i` & then `npm start`. 

## Future Work:

- A more compact & comprehensive process for handling server status and unavailability errors.
- Settle on an even more modern design driven by client desires.
- Involving DevOps pipeline to automate tests upon every build (CI/CD).
- User INput Sanitation against XSS attacks.
- Solve the demos details tag element problem (does not show instructions for details tag).

---

# تحدي نظام إدارة الطلبات

نظام مكون من واجهة خلفية وأخرى أمامية كل في نظام بيئي خاص وتم تطويرهما على حدة. مبرمج ليكون نموذج يساعد في بناء نظام يساعد الشركات في إدارة طلبات عملائهم، وذا نقطة مركزية مشتركة بين جميع الموظفين.

## التقنيات المستعملة:

تم استعمال إطار React لتسريع عملية بناء واجهة المستخدم وجعلها قابلة للصيانة وكذلك قوة الإطار في إدارة حالة الموقع على أجزاء بدلاً من شجرة الDOM دفعة واحدة. في الواجهة الخلفية تم استعمال بيئة Node.js مع إطار Express.js لبرمجة الAPI، مع وجود زاحف ويب باستعمال Puppeteer من أجل خاصية إضافة خلفية لكروت الطلبات على واجهة المستخدم. قاعدة بيانات MongoDB السحابية أختيرت كحل تخزين لهذا النظام. تم إجراء اختبارات النهاية للنهاية عبر إطار Cypress من أجل اختبار الAPI وقاعدة البيانات وواجهة المستخدم، بينما Jest مع testing library تم استعمالها لعمل component testing لأجزاء واجهة المستخدم.

## مميزات النظام:

- إجراء العمليات (كتابة، قراءة، تحديث وحذف) على الطلبات.
- القدرة على تسجيل الدخول والخروج باستعمال الجلسات express-sessions.
- وجود نقطة مركزية للموظفين يمكنهم من خلالها تحديث وحذف الطلب بسلاسة.
- إمكانية جعل النظام يعمل من أجل البحث عن صورة خلفية بناء على عنوان الطلب (زاحف الويب) (ميزة إضافية).
- العمل على رسومات متحركة لزيادة حيوية النظام حسب رغبة المستخدم (ميزة إضافية).
- ميزة تتيح للمبرمج تشكيل عروض تقديمية لمساعدة المستخدمين على استخدام الموقع (ميزة إضافية).
- لإضافة عرض تقديمي قم بإضافة /assets/html/demo.html لعنوان الصفحة (خاصية تجريبية) و يتطلب الأمر معرفة تقنية عن الDOM
- السرعة في التبديل بين لغات ولهجات الموقع (ميزة إضافية).

## التحدي:

العمل على المشروع مع محاولة إضافة أفكار ولمسات خاصة خلال أسبوع ونصف على الأقل، بالتزامن مع تعلم إطارات جديدة على المطور مثل Cypress.

## استضافة التطبيق محليًا؟
- .انسح المشروع

**الواجهة الأمامية:**
استعمل خدمة الاستضافة للسيرفر المفضلة لديك مثل أباتشي أو استخدام إضافة Live Server في برنامج VSCode.

**الواجهة الخلفية:**
1. قم بكتابة الأمر `npm i` لتثبيت المكتبات المطلوبة.
2. قم بكتابة الأمر `npm start` للاستضافة على المنفذ 8080.
   *تأكد من عدم استخدام المنفذ من قبل تطبيق الواجهة الأمامية أو أي خدمة أخرى.*

**الإختبارات:**
ادخل على المجلد لنوع الإختبارات المرغوب فيها، قم بكتابة الأمر `npm i`، ثم قم بكتابة الأمر `npm start`.

## أعمال مستقبلية:

- العمل على التعامل مع أخطاء السيرفر و عدم توفره بصورة شاملة و أكثر نظامية.
- التعديل على التصميم حتى يتناسب مع رغبات العميل.
- إخضاع المشروع لمبادئ DevOps من أجل أتمتة الإختبارات قبل كل بناء للبرامج (CI/CD).
- تنقيح مدخلات المستخدم لصد هجمات XSS
- حل مشكلة عنصر الHTML Details وقت العروض التقديمية، لا يتم عرض تعليمات المساعدة

## :رابط البرنامج المستضاف

https://anastar5858.github.io/RMS-front/
