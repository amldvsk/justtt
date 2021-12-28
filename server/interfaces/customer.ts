export interface Customer {
  customer_id: number | null;
  customer_version_id: number | null;
  customer_uuid?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  gender?: string | null;
  country?: string | null;
  city?: string | null;
  street?: string | null;
  phone?: string | null;
}

export interface Customer_Req {
  customer_uuid: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  gender: string | null;
  country: string | null;
  city: string | null;
  street: string | null;
  phone: string | null;
}
