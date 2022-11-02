import { UserData } from "../common/types";
import { atom } from "nanostores"

export class User {
    baseUrl: string
    // data: UserData

    constructor (baseUrl?: string) {

        if (baseUrl == null) {
            this.baseUrl = this.getBaseUrl();
        }
    }

    /**
     * Fetch user data by ID or email
     * @param id user ID or user identifier (email)
     */
    async fetchUser(id: number | string) {
        const query = typeof id == "number" ? `/api/users/${id}?populate[0]=role` : `/api/users?filters=[email][$eq]=${id}&populate[0]=role`
        console.log("fetchUser", query);

        return await fetch(`${this.baseUrl}${query}`).then(res => res.json())
            .then(resp => {
                console.log("resp", resp);
                const d = resp instanceof Array ? resp[0] : resp

                const data = new UserData({
                    id: d?.id,
                    username: d?.username,
                    email: d?.email,
                    provider: d?.provider,
                    confirmed: d?.confirmed,
                    blocked: d?.blocked,
                    role: d?.role?.name,
                })
                return data
            })
    }

    async login(identifier: string, password: string) {
        const url = `${this.baseUrl}/api/auth/local`
        console.log("login", url);

        return await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                identifier: identifier,
                password: password
            })
        })
            .then(res => {
                console.log("login res", res);
                if (res.status == 200) {
                    return res.json()
                }
            })
            .then(resp => {
                console.log("login resp", resp);

                if (resp?.user.confirmed && !resp?.user.blocked) {

                    return this.fetchUser(resp?.user.id)
                } else {
                    //TODO: error message
                }
            });
    }

    private getBaseUrl(): string {
        let baseUrl = import.meta.env.PUBLIC_STRAPI_URL;

        if (baseUrl === undefined) {
            baseUrl = `${import.meta.env.PUBLIC_STRAPI_URL}`
        }
        return baseUrl
    }
}

export const userStore = atom(new UserData())