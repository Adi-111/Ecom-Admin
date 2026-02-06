import Stripe from "stripe"

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
    if (!_stripe) {
        const key = process.env.STRIPE_API_KEY
        if (!key) throw new Error("STRIPE_API_KEY is required")
        _stripe = new Stripe(key, {
            apiVersion: "2026-01-28.clover",
            typescript: true
        })
    }
    return _stripe
}