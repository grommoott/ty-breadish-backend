const Roles = {
    User: "user",
    Admin: "admin"
} as const

type Role = typeof Roles[keyof typeof Roles]

export { Role, Roles }
