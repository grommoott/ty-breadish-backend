const Roles = {
    User: "user",
    Admin: "admin",
    Baker: "baker"
} as const

type Role = typeof Roles[keyof typeof Roles]

export { Role, Roles }
