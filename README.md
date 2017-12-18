Welcome to YoungDobeExpert!
===================
----------
this is using Raspberry Pi color-picking project.

+-----------------+
| Tables_in_color |
+-----------------+
| color_color     |
| color_history   |
+-----------------+

mysql> desc color_color;
+-------+---------+------+-----+---------+-------+
| Field | Type    | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
| no    | int(11) | YES  |     | NULL    |       |
| r     | int(11) | YES  |     | NULL    |       |
| g     | int(11) | YES  |     | NULL    |       |
| b     | int(11) | YES  |     | NULL    |       |
+-------+---------+------+-----+---------+-------+

mysql> desc color_history;
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| no    | int(11)      | NO   | PRI | NULL    | auto_increment |
| color | varchar(255) | YES  |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
