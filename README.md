SCRUM-board
===========

The Idea
--------
  * Project based SCRUM board that can be edited by anyone you like (team for example)
  * One **user** can have multiple **projects** (1..*)
  * One **project** can have one **board** (1..1)
  * One **board** can have multiple **notes** (1..*)

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
| Default       | bool          |
