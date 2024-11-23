export default class HubSpot_Contacts {

	api: any;
	
	constructor(props: {
		api: any
	}) {
		this.api = props.api;
	}

	get = async (
		id: string,
		options: {
			objData?: boolean
		} = {}
	): Promise <object> => {
		let objData: object = {
			id
		};
		if (options.hasOwnProperty('objData') === false || options?.objData === true) {
			const res = await this.api.get(`/objects/contacts/${id}`);
			objData = await res.json();		
		}
		return {
			...objData,
			addAutoTags: async (
				properties: {
					[key: string]: string[]
				}
			): Promise<any> => {
				const propertyNames: string[] = Object.keys(properties);
				const getContact: any = await this.api.get(`/objects/contacts/${id}?properties=${propertyNames.join(',')}`);
				const getContactData: any = await getContact.json();
				let updatedProperties: {
					[key: string]: string
				} = {}
				await Promise.all(
					Object.keys(properties).map(async (propertyName: any) => {
						// System Property
						// Get property (e.g. incl. 'options' etc.)
						const getProperty = await this.api.get(`/properties/contacts/${propertyName}`);  
						const getPropertyData = await getProperty.json();
						// Extract 'label' field
						let propertyOptions = getPropertyData.options; 
						const propertyOptionLabels = getPropertyData.options.map((item: { [key: string]: any; }) => item['label']);
						// Filter for 'new' labels (to be added to the Contact)
						const newOptionLabels = properties[propertyName].filter(item => !propertyOptionLabels.includes(item));
						// If necessary, update the property to include new 'labels' etc.
						if (newOptionLabels.length) {
							newOptionLabels.forEach((newOptionLabel: any) => {
								propertyOptions.push({
									label: newOptionLabel,
									value: newOptionLabel,
									description: '',
									displayOrder: propertyOptionLabels.length,
									hidden: false
								});
							});
							const updateProperty = await this.api.patch(`/properties/contacts/${propertyName}`,{
								options: propertyOptions
							}); 
							// Debug
							// console.dir( await updateProperty.json(), { depth: null } );
						}
						// Contact's Property
						if (getContactData?.properties[propertyName]) {
							updatedProperties[propertyName] = [...new Set([...getContactData?.properties[propertyName].split(';'), ...properties[propertyName]])].join(';');
						}
						else {
							updatedProperties[propertyName] = properties[propertyName].join(';');
						}
					})
				);
				// Update Contact's properties
				const updateContact = await this.api.patch(`/objects/contacts/${id}`,{
					properties: updatedProperties
				});
				// Return
				return updateContact.json();
            },
			removeAutoTags: async (
				properties: {
					[key: string]: string[]
				}
			): Promise<any> => {
				const propertyNames: string[] = Object.keys(properties);
				const getContact: any = await this.api.get(`/objects/contacts/${id}?properties=${propertyNames.join(',')}`);
				const getContactData: any = await getContact.json();
				let updatedProperties: {
					[key: string]: string
				} = {}
				await Promise.all(
					Object.keys(properties).map(async (propertyName: any) => {
						// Contact's Property
						if (getContactData?.properties[propertyName]) {
							updatedProperties[propertyName] = getContactData?.properties[propertyName].split(';').filter((item: string) => !properties[propertyName].includes(item)).join(';');
						}
					})
				);
				// Update Contact's properties
				const updateContact = await this.api.patch(`/objects/contacts/${id}`,{
					properties: updatedProperties
				});
				// Return
				return updateContact.json();
            },
		}
	}

	getList = async (
		params: {
			page?: string
		}
	): Promise <object> => {
		const { buildQueryString } = await import('../utils/helpers.js');
		const queryString = buildQueryString(params);
		const res = await this.api.get(`/objects/contacts?${queryString}`);
		// Debug
		// console.dir(res, { depth: null })
		// Return
		return await res.json();
	}

	create = async (
		body: {
			properties: {
				firstname: string,
				lastname: string,
				email: string,
				sendfox_email: string,
			}
		}
	): Promise <object> => {
		const res = await this.api.post(`/objects/contacts`,body); 
		return await res.json();
	}

}