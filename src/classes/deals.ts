export default class HubSpot_Deals {

	api: any;
	#associationTypes: {
		[key: string]: {}
	};
	
	constructor(props: {
		api: any
	}) {
		this.api = props.api;
		this.#associationTypes = {
			contact: 3,
		}
	}

	get = async (
		id: string
	): Promise <object> => {
		const res = await this.api.get(`/objects/deals/${id}`); 
		const dealData = await res.json();
		return {
			...dealData,
			addToContact: async (
				id: string
			): Promise<any> => {
				const dealId: string = dealData.id;
				const toObjectType: string = 'contact';
				const toObjectId = id; 
				const associationTypeId = this.#associationTypes['contact'];
				const res = await this.api.put(`/objects/deals/${dealId}/associations/${toObjectType}/${toObjectId}/${associationTypeId}`); 
				console.log( res )
				return await res.json();
            },
		}
	}

	getList = async (
		
	): Promise <object> => {
		const res = await this.api.get(`/object/deals`); 
		return await res.json();
	}

	create = async (
		body: {
			properties: {
				dealname: string,
				amount: string,
				closedate?: string,
				pipeline?: string,
				dealstage?: string,
				hubspot_owner_id?: string
			},
			associations?: {

			}
		}
	): Promise <object> => {
		const res = await this.api.post(`/objects/deals`,body); 
		return await res.json();
	}

}

// https://developers.hubspot.com/docs/api/crm/associations#association-type-id-values