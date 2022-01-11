# Chess
My first big project
A chess program using vanilla JS. 

Issues:
-~~King move logic is broken~~
-Need to add these functionalities:
  -En Passant
  -Castling
  -promotion
  -Pawn from starting row can move two spaces even with piece in front of it

In the future:
-save games into SQL database
-add undo or move forward functions to go through past moves
-Moved logic to check white or black piece more upstream to when dragevent starts instead of doing the check at the time of individual unit check. Can remove redundancy with some of the checks
