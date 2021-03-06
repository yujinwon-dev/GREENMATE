# green๐ฑmate backend

## โ๋ฐฑ์๋ ์คํ

1. ๊ฐ์ํ๊ฒฝ ์ค์  ๋ฐ ์คํ

   ```bash
   # ๊ฐ์ํ๊ฒฝ ์์ฑ (์ต์ด)
   python -m venv venv
   
   # ๊ฐ์ํ๊ฒฝ ์คํ (ํ๋ก์ ํธ ์คํ๋ง๋ค)
   source venv/scripts/activate
   ```

   

2. ํจํค์ง ์ค์นํ๊ธฐ

   ```bash
   # ํจํค์ง ์ค์น
   pip install -r requirements.txt
   
   # ํจํค์ง ์ ์ฅ (ํจํค์ง ๋ณ๊ฒฝ์ ์คํ)
   pip freeze > requirements.txt
   ```

   

3. mysql ์ค์น ๋ฐ ์ค์ 

   > mysql Ver `8.0.27`
   >
   > PORT๊ฐ `3306`์ด ์๋ ๊ฒฝ์ฐ, `backend/settings.py` DATABASES PORT ๋ณ๊ฒฝ ํ์ (์๋ก๋ ์ ์ฃผ์!)

   ```bash
   # mysql version ํ์ธ (cmd or mysql cmd)
   mysql --version
   
   # cmd์์ mysql ์ฌ์ฉ
   mysql -u root -p
   
   # db ์์ฑ (mysql cmd)
   CREATE DATABASE greenmate DEFAULT CHARACTER SET utf8;
   
   # [์ฐธ๊ณ ] default_character_set_name ์ค์  ํ์ธ (mysql cmd)
   SELECT schema_name, default_character_set_name FROM information_schema.schemata;
   
   # [์ฐธ๊ณ ] default_character_set_name์ด utf8์ด ์๋ ๊ฒฝ์ฐ ๋ณ๊ฒฝํ๊ธฐ (mysql cmd)
   ALTER DATABASE greenmate DEFAULT CHARACTER SET utf8;
   
   # User ์์ฑ (mysql cmd)
   CREATE USER greenmate@localhost IDENTIFIED BY 'greenmateB105';
   
   # DB ์ ๊ทผ๊ถํ ๋ถ์ฌ (mysql cmd)
   GRANT ALL PRIVILEGES ON greenmate.* TO greenmate@localhost WITH GRANT OPTION;
   FLUSH PRIVILEGES;
   
   # PORT ํ์ธ (mysql cmd)
   SHOW GLOBAL VARIABLES LIKE 'PORT';
   ```

   

4. Migration

   > ๋ชจ๋ธ ํด๋์ค์ ์์  (๋ฐ ์์ฑ )์ DB์ ์ ์ฉํ๋ ๊ณผ์ 

   ```bash
   # ๋ง์ด๊ทธ๋ ์ด์ ์์ฑ (django)
   python manage.py makemigrations
   
   # DB์ ์ ์ฉ (django)
   python manage.py migrate
   ```

   

5. ์คํ

   ```bash
   python manage.py runserver
   ```

   

6. GUI ์ค์ 

   - `workbench`

     ```bash
     1. MySQL Connections ์ถ๊ฐ
     2. Connection Name ์ค์  (์๋ฌด๊ฑฐ๋ ๊ฐ๋ฅ)
     3. Port ํ์ธ
     4. Username ์๋ ฅ (greenmate)
     5. Password ์๋ ฅ (greenmateB105)
     ```

     ![image-20220426014408472](C:\Users\multicampus\Desktop\SSAFY\4.์์จPJT\GreenMate\backend\README.assets\image-20220426014408472.png)

   - `HeidSQL`

     ```bash
     1. ์ ๊ท ์์ฑ
     2. ์ฌ์ฉ์, ์ํธ ์๋ ฅ
     3. ํฌํธ ํ์ธ
     ```

     ![image-20220426014602877](C:\Users\multicampus\Desktop\SSAFY\4.์์จPJT\GreenMate\backend\README.assets\image-20220426014602877.png)





- #### swagger_auto_schema ์์ฑํ๊ธฐ

  > [์ฐธ๊ณ ](https://velog.io/@lu_at_log/drf-yasg-and-swagger)

  ```bash
  # decorator import
  from drf_yasg.utils import swagger_auto_schema
  
  
  # request_body ์์ฑ
  @swagger_auto_schema(request_body=serializer)
  def test():
  	pass
  	
  	
  # query parameter ์์ฑ => query parameter์ ์ฌ์ฉ๋๋ ๊ฐ๋ค์ serializer ๋ง๋ค๊ธฐ
  class SearchSerializer(serializers.Modelserializer):
      word = serializers.CharField(help_text="๊ฒ์์ด", required=False)
      page = serializers.IntegerField(help_text="ํ์ด์ง", required=False)
     
  @swagger_auto_schema(query_serializer=SearchSerializer)
  def search():
  	pass
  	
  	
  # path parameter ์์ฑ => path parameter์ ์ฌ์ฉ๋๋ ๊ฐ๋ค์ serializer ๋ง๋ค๊ธฐ
  class ProfileSerializer(serializers.Serializer):
      user_id = serializers.IntegerField(help_text='์ ์  pk', required=True)
      
  @swagger_auto_schema(path_serializer=ProfileSerializer)
  def profile():
  	pass
  ```

  



