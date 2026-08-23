# Security Specification

## Data Invariants
1. A `quizScore` must always belong to the authenticated user and `userId` must match `request.auth.uid`.
2. A `savedWavelength` must always belong to the authenticated user and `userId` must match `request.auth.uid`.
3. `createdAt` must be the server timestamp.
4. Users can only read and write documents in their own `/users/{userId}/...` subcollections.

## The Dirty Dozen Payloads

1. **Identity Spoofing (quizScore)**: User A tries to create a score in User B's subcollection. (DENY)
2. **Identity Spoofing (userId field)**: User A creates a score in User A's subcollection but sets `userId` field to User B's UID. (DENY)
3. **Missing Required Fields**: Creating a `savedWavelength` without `label`. (DENY)
4. **Extra Ghost Fields**: Creating a `quizScore` with a fake field `isAdmin: true`. (DENY)
5. **Invalid Types**: `score` is a string instead of a number. (DENY)
6. **Boundary Violations (String)**: `label` string is 500 characters long (limit 100). (DENY)
7. **Temporal Forgery**: Client sets `createdAt` to a date in the past instead of `request.time`. (DENY)
8. **Unauthorized Read**: User A tries to get User B's `savedWavelengths`. (DENY)
9. **List Query Trust**: User querying a list of `savedWavelengths` without checking if `userId == request.auth.uid`. (DENY)
10. **Admin Bypass**: Adding `admin: true` to a saved wavelength update. (DENY)
11. **Size Bombing**: Path ID for `scoreId` is > 128 chars. (DENY)
12. **Orphaned Write**: Creating a score where the parent user document doesn't strictly need to exist because we store entirely in subcollections, but the `userId` in path MUST match `auth.uid`.

## Test Runner
(Implemented in `firestore.rules.test.ts` if needed).
