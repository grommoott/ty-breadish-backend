import { Image, User, VerificationCode } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import { checkAuthorized, checkBodyParams, checkParams, contentJson, Middleware } from "@middlewares"
import { Email, Hash, ImageId, UserId } from "@primitives"
import images from "./images"
import { ImageCategories } from "@enums"

class Users {
    public getUsernameAvailable: Array<Middleware> = [
        checkParams(["username"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const username: string = req.params.username

            const user: User | Error = await User.fromUsername(username)

            if (user instanceof Error) {
                if (user.message.startsWith("User with such username")) {
                    res.send(false)

                    next()
                    return
                }

                next(user)
                return
            }

            res.send(true)

            next()
        })
    ]

    public getEmailAvailable: Array<Middleware> = [
        checkParams(["email"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const email: Email = new Email(req.params.email)

            const user: User | Error = await User.fromEmail(email)

            if (user instanceof Error) {
                if (user.message.startsWith("User with such email")) {
                    res.send(false)

                    next()
                    return
                }

                next(user)
                return
            }

            res.send(true)

            next()
        })
    ]

    public getIsPasswordIsValid: Array<Middleware> = [
        checkAuthorized,
        checkParams(["password"]),
        asyncErrorCatcher(async (req, res, next) => {
            const password: string = req.params.password

            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            res.send(await user.isPasswordIsValid(password))
        })
    ]

    public getUsername: Array<Middleware> = [
        checkParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const id: UserId = new UserId(req.params.id)

            const user: User | Error = await User.fromId(id)

            if (user instanceof Error) {
                next(user)
                return
            }

            res.send(user.username)
        })
    ]

    public get: Array<Middleware> = [
        checkAuthorized,
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            res.send(user.toNormalView())
        })
    ]

    public delete: Array<Middleware> = [
        checkAuthorized,
        checkParams(["verificationCode", "password"]),
        asyncErrorCatcher(async (req, res, next) => {
            const code: number = parseInt(req.params.verificationCode)
            const password: string = req.params.password

            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            if (!await user.isPasswordIsValid(password)) { // TODO
                next(new Error("Invalid password!"))
                return
            }

            const verificationCode: VerificationCode | Error = await VerificationCode.fromEmail(user.email)

            if (verificationCode instanceof Error) {
                next(verificationCode)
                return
            }

            if (!await verificationCode.compare(code)) {
                next(new Error("Invalid verificationCode"))
                return
            }

            const del: boolean | Error = await user.delete()

            if (del instanceof Error) {
                next(del)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]

    public put: Array<Middleware> = [
        checkAuthorized,
        checkBodyParams(["password"]),
        asyncErrorCatcher(async (req, res, next) => {
            const password: string = req.body.password

            const username: string | undefined = req.body.username
            const newPassword: string | undefined = req.body.newPassword
            const email: Email | undefined = new Email(req.body.email)
            const code: number | undefined = req.body.verificationCode
            const newCode: number | undefined = req.body.newVerificationCode

            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            if (!user.isPasswordIsValid(password)) {
                next(new Error("Invalid password!"))
                return
            }

            if (username) {
                const userWithUsername: User | Error = await User.fromUsername(username)

                if (!(userWithUsername instanceof Error)) {
                    next(new Error(`User with such username(${username}) is already exists`))
                    return
                }
            }

            if (email) {
                const userWithEmail: User | Error = await User.fromEmail(email)

                if (!(userWithEmail instanceof Error)) {
                    next(new Error(`User with such email(${email}) is already exists`))
                    return
                }
            }

            if (newPassword || email) {
                if (!code) {
                    next(new Error("To update password or email you must also send verification code"))
                    return
                }

                const verificationCode: VerificationCode | Error = await VerificationCode.fromEmail(user.email)

                if (verificationCode instanceof Error) {
                    next(verificationCode)
                    return
                }

                if (!verificationCode.compare(code)) {
                    next(new Error("Invalid verification code"))
                    return
                }

                if (email) {
                    if (!newCode) {
                        next(new Error("To update email you must alse send verification code wich sended on your new email"))
                        return
                    }

                    const newVerificationCode: VerificationCode | Error = await VerificationCode.fromEmail(email)

                    if (newVerificationCode instanceof Error) {
                        next(newVerificationCode)
                        return
                    }

                    if (!newVerificationCode.compare(code)) {
                        next(new Error("Invalid new verification code"))
                        return
                    }
                }
            }

            const edit: void | Error = await user.edit({ username, passwordHash: newPassword ? new Hash(newPassword) : undefined, email: email })

            if (edit instanceof Error) {
                next(edit)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]

    public getAvatars: Array<Middleware> = images.get(ImageCategories.Users, true)

    private checkAvatarPermissions: Middleware =
        asyncErrorCatcher(async (req, res, next) => {
            const id: ImageId = new ImageId(req.params.id)

            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            if (user.id.id != id.id) {
                next(new Error("Forbidden!", { cause: 403 }))
                return
            }
        })

    private setIdParam: Middleware =
        asyncErrorCatcher(async (req, res, next) => {
            req.params.id = req.body.accessTokenPayload.sub
        })

    private setIdParamInBody: Middleware =
        asyncErrorCatcher(async (req, res, next) => {
            req.body.id = req.body.accessTokenPayload.sub
        })

    public postAvatars: Array<Middleware> = [
        checkAuthorized,
        this.setIdParamInBody,
        this.checkAvatarPermissions,
        ...images.postCreate(ImageCategories.Users, true)
    ]

    public deleteAvatars: Array<Middleware> = [
        checkAuthorized,
        this.setIdParam,
        this.checkAvatarPermissions,
        ...images.delete(ImageCategories.Users, true)
    ]

    public putAvatars: Array<Middleware> = [
        checkAuthorized,
        this.setIdParamInBody,
        this.checkAvatarPermissions,
        ...images.put(ImageCategories.Users, true)
    ]
}

export default new Users()
