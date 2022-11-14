# shift_api

<a id="tech"></a>
## 使用技術
* JavaScript
* TypeScript 3.9.7
* Node.js 16.13.0
* Express 4.18.1
* MySQL 2.18.1


<a id="db"></a>
## DB設計
<br>

Staffs
Field | Type | Null | Key | Default | Extra
-|-|-|-|-|-
id | INT | NO | PRI | NULL | AUTO_INCREMENT
username | VARCHAR(20) | NO |  | NULL | 
password | VARCHAR(20) | NO |  | NULL | 
<br>

Admins
Field | Type | Null | Key | Default | Extra
-|-|-|-|-|-
id | INT | NO | PRI | NULL | AUTO_INCREMENT
username | VARCHAR(20) | NO |  | NULL | 
password | VARCHAR(20) | NO |  | NULL | 
<br>


Shift_Statuses
Field | Type | Null | Key | Default | Extra
-|-|-|-|-|-
id | INT | NO | PRI | NULL | AUTO_INCREMENT
status | INT | NO |  | NULL | 
<br>

Shifts
Field | Type | Null | Key | Default | Extra
-|-|-|-|-|-
id | INT | NO | PRI | NULL | AUTO_INCREMENT
staff_id | INT | NO | MUL | NULL | 
status_id | INT | NO | MUL | NULL | 
day | DATE | NO |  | NULL | 
<br>

Complete_Shifts
Field | Type | Null | Key | Default | Extra
-|-|-|-|-|-
id | INT | NO | PRI | NULL | AUTO_INCREMENT
staff_id | INT | NO | MUL | NULL | 
status_id | INT | NO | MUL | NULL | 
day | DATE | NO |  | NULL | 
