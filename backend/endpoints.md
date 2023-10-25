# Endpoints
## Cards source
https://api.github.com/repos/CCondeluci/WeissSchwarz-ENG-DB/contents/DB

## Endpoints
### Cards
- Post: new card (admin)
- Get: list of all cards (any auth). Filter on all fields
- Get: Specific card (any auth)
### Attributes
- Post new attribute
- Get specific attribute
- Get list of attributes, filter on name?
### Sets
- Post: new set (admin)
- Get: Specific set (any auth)
- Get: All sets (any auth). Filter on name and code field
- Get: all cards in a set (any auth)
### Decks
- Post: new deck (auth user). User may not have other deck with same name
- Get: All decks from user (auth user, has to be the user in question, otherwise only return public decks)
- Get: specific deck (auth user, user in question or public deck)
- Patch: update deck (auth user, owner of deck, deck can not have been used in a game)
### Users
?