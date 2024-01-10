-- دریافت خانه هایی که متعلق به افرادی که نام کوچک آن ها فاطیما یا ناهید باشد
SELECT * FROM Estate_estate WHERE owner_id IN (SELECT id FROM User_user WHERE first_name LIKE 'ناهید' OR first_name LIKE 'فاطیما');

-- حذف خانه هایی که تایید نشده اند
DELETE FROM Estate_estate WHERE is_confirm = false;

-- غیرفعال کردن خانه هایی که افراد آن غیرفعال هستند
UPDATE Estate_estate SET is_confirm=false WHERE owner_id in (SELECT id FROM User_user WHERE is_active = false)

-- دریافت اطلاعت خانه به همراه نام کاربری صاحب خانه و مستاجر
SELECT Estate_estate.*, u.username as owner, tenant.username as tenant FROM Estate_estate INNER JOIN User_user as u ON Estate_estate.owner_id = u.id INNER JOIN User_user as tenant ON Estate_estate.tenant_id = tenant.id;

-- دریافت تعداد خانه های هر فرد
SELECT owner.username, COUNT(owner.id) FROM Estate_estate as HOUSE_COUNT INNER JOIN User_user as owner ON Estate_estate.owner_id = owner.id GROUP BY owner.id;

-- نمایش افرادی که صاحب ملک هستند
SELECT distinct owner.username FROM Estate_estate INNER JOIN main.User_user owner on Estate_estate.owner_id = owner.id;

-- نمایش افرادی که مستاجر هستند
SELECT User_user.username FROM User_user WHERE EXISTS(SELECT id FROM Estate_estate WHERE tenant_id=User_user.id)

-- جمع کل قیمت خانه های قرار گذاشته شده
SELECT SUM(mortgage_price) FROM Estate_estate;

-- دریافت مجموع خانه های خریداری شده هر فرد
SELECT username, SUM(Ee.mortgage_price) FROM User_user INNER JOIN main.Estate_estate Ee on User_user.id = Ee.tenant_id;

-- دریافت ارزان ترین خانه
SELECT MIN(mortgage_price) FROM Estate_estate;

-- دریافت گران ترین خانه
SELECT MAX(mortgage_price) FROM Estate_estate;

-- دریافت افرادی که بیش از ۳ خانه قرار داده اند
SELECT * FROM User_user INNER JOIN main.Estate_estate Ee on User_user.id = Ee.owner_id GROUP BY User_user.id HAVING COUNT(User_user.id) > 3


SELECT * FROM User_user LEFT JOIN main.Estate_estate Ee on User_user.id = Ee.tenant_id;

-- آدرس خانه مالکی که کدملی آن شامل ۴۵۸ است
SELECT username, address FROM User_user WHERE national_code LIKE '%458%';

-- دریافت خانه های اجاره شده توسط فرد ناهید
SELECT Estate_estate.*FROM Estate_estate INNER JOIN main.User_user tenant on tenant.id = Estate_estate.tenant_id WHERE tenant.first_name = 'ناهید';
