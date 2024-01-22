CONTRACT_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .header {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 3fr));
            margin-top: 10px;
        }

        .header > div {
            width: 100%;
            align-items: center;
            display: flex;
            flex-direction: column;
        }

        hr {
            height: 2px;
            background: gray;
        }

        .footer {
            
        }
        
    </style>
</head>
<body>
<div dir="rtl">
    <div class="header" style="">
        <div>
            <div>قوه قضائیه</div>
            <div>سازمان ثبت اسناد و املاک کشور</div>
            <div>اداره کل امور اسناد و سردفتران</div>
        </div>
        <div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 3px">
                <span style="margin: 0; padding: 0">به نام خدا</span>
                <span>
                    یا ایها الذین امنوا اوقوا بالعقود
                </span>
                <h1 style="margin: 0; padding: 0; font-weight: bolder;">اجاره نامه</h1>
            </div>
        </div>
        <div>
            <div>وزارت بازرگانی</div>
            <div>مجتمع امور صنفی توزیعی - خدماتی</div>
            <div>اتحاد صنف مشاورین املاک</div>
        </div>
    </div>
    <hr/>
    <div class="body">
        <div>
            <h4>ماده ۱: طرفین قرارداد</h4>

            <div>
                <p>
                    1-1- موجر/موجرین @owner_name فرزند @owner_father به شماره شناسنامه @owner_birth_certificate_id صادره از
                    @owner_issued_national کد ملی @owner_national_id متولد @owner_birthday ساکن @owner_address تلفن
                    @owner_phone
                    با
                    وکلات/قیمومت/ولایت/وصایت @owner_name فرزند @owner_father به شماره شناسنامه @owner_national_id تولد
                    @owner_birthday
                </p>

                <p>
                    2-1- مستاجر/مستاجرین @tenant_name
                    فرزند @tenant_father
                    به شماره شناسنامه @tenant_birth_certificate_id
                    صادره از @tenant_issued_national
                    کد ملی @tenant_national_id
                    متولد @tenant_birthday
                    ساکن @tenant_address
                    تلفن @tenant_phone
                    با وکلات/قیمومت/ولایت/وصایت
                    @tenant_name فرزند
                    @tenant_father به شماره شناسنامه
                    @tenant_national_id تولد
                    @tenant_birthday
                </p>
            </div>
        </div>
        <div>
            <h4>ماده ۲: موضوع قرارداد و مشخصات مورد اجاره</h4>
            <p>
                عبارتست از تملیک منافع
                @manafe
                دانگ/دستگاه/یکباب
                @dang
                واقع در
                @location
                دارای پلاک ثبتی شماره
                @house_number
                فرعی از
                @
            </p>
        </div>
    </div>
</div>
</body>
</html>
"""