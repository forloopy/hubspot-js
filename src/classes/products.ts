export default class HubSpot_Products {

	api: any;
	
	constructor(props: {
		api: any
	}) {
		this.api = props.api;
	}

	get = async (
		id: string
	): Promise <object> => {
		const res = await this.api.get(`/objects/products/${id}`); 
		return await res.json();
	}

	getList = async (
		
	): Promise <object> => {
		const res = await this.api.get(`/objects/products`); 
		// Debug
		// console.dir(res, { depth: null })
		// Return
		return await res.json();
	}

	create = async (
		body: {
			properties: {
				name: string,
				description: string,
				price: string,
				sku?: string,
				product_type?: string,
			},
		}
	): Promise <object> => {
		const res = await this.api.post(`/objects/products`,body); 
		return await res.json();
	}

}