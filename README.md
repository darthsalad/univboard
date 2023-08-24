# Uniboard

## Description
`Uniboard` is a cross-device universal clipboard and file-sharing platform made with `Next.js` and `Go`. It uses a `MySQL` database from `Planetscale` to store messages and users and `AWS S3` for file storage.
## TODO
- [x] Planetscale schema for fields:
	- created_at
	- modified_at
- [x] NewUser method integrate instead of decoding directly to struct
- [x] Errors thrown in api route functions should be thrown through JSON responses and shouldn't the server
- [x] Remove unnecessary log.Fatal calls causing server to crash - only log.Default calls and Fatal calls in [necessary places](https://stackoverflow.com/questions/33885235/should-a-go-package-ever-use-log-fatal-and-when#:~:text=73-,It,-might%20be%20just)
- [x] custom log file location of source file instead of logger.go
