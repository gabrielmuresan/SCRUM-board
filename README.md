SCRUM-board
===========

The Idea
--------
  * Project based SCRUM board that can be edited by anyone you like (team for example)
  * One **user** can have multiple **projects** (1..*)
  * One **project** can have one **board** (1..1)
  * One **board** can have multiple **notes** (1..*)

The story behind the idea
-------------------------
Currently I am a student in Denmark taking web development courses where we have to create a simple web application. The main idea of a SCRUM board came from the list of things we could do for that application.

Scrum board result
------------------
```
 |         Story		|         To Do			|      In Process		|       To Verify		|       Done		|
 | :------------------: | :-------------------: | :-------------------: | :-------------------: | :---------------: |
 |						|						|						|						|				    |
 |						|						|						|						|				    |
 |						|						|						|						|				    |
 |						|						|						|						|			        |
 |						|						|						|						|					|
```

Table Structure
---------------

| User          | Type          |
| :-----------: | :-----------: |
| Id            | int           |
| FirstName     | string        |
| MiddleName    | string        |
| LastName      | string        |
| Email         | string        |

| Project       | Type          |
| :-----------: | :-----------: |
| Id            | int           |
| UserId        | int           |
| Title         | string        |
| Default       | bool          |

| Board         | Type          |
| :-----------: | :-----------: |
| Id            | int           |
| ProjectId     | int           |
| ColumnNames   | string        |

| Note          | Type          |
| :-----------: | :-----------: |
| Id            | int           |
| ProjectId     | int           |
| ColumnNumber  | string        |

