export const getBaseUrl = ():string => { 
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://school-api.salontrainingpro.app/api/v1"
}