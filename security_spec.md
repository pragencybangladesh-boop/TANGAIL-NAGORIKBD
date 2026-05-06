# Security Specification for Sylhet Nagorik BD

## Data Invariants
1. Complaints must have a valid tracking ID and status.
2. Notices can only be created by users with the 'Notice Editor' role or Admin.
3. Volunteers can register anonymously but can only be updated by Admins.
4. AI queries are logged publicly but can only be managed by Admins.
5. User roles are strictly controlled by Admins.

## "Dirty Dozen" Payloads (Denial Expected)
1. **Identity Spoofing**: Attempt to create a notice as a regular user.
2. **Shadow Field**: Adding `isAdmin: true` to a user profile update.
3. **Ghost Field**: Adding `verified: true` to a volunteer registration.
4. **State Shortcut**: Updating a complaint status directly from 'Pending' to 'Resolved' as a regular user.
5. **ID Poisoning**: Using a 2KB string as a `complaintId`.
6. **Resource Exhaustion**: Sending a 1MB string in the `message` field of a complaint.
7. **Relational Breach**: Creating a complaint for a non-existent upazila (if strictly validated).
8. **PII Leak**: Non-admin user querying `aiQueries` and getting detailed results of other users' emails.
9. **Role Escalation**: Self-assigning `canMonitorComplaints` in `/roles/{email}`.
10. **Immutable Violation**: Trying to change the `createdAt` timestamp of an existing complaint.
11. **Type Poisoning**: Sending an integer where a string is expected for `name`.
12. **Blanket Read Attack**: Trying to list all documents in `/roles` as a guest.

## Test Runner
Verified through logic analysis and hardened rules implementation.
