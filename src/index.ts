// Utils
import HubSpot_APIClient from './utils/client.js';
// Classes
import HubSpot_Contacts from './classes/contacts.js';
import HubSpot_Deals from './classes/deals.js';
import HubSpot_Products from './classes/products.js';

export default class HubSpot {

	api: any;
	contacts: any;
	deals: any;
	products: any;

	constructor(props: {
		accessToken: string
	}) {
		this.api = new HubSpot_APIClient({
			accessToken: props.accessToken
		});
		this.contacts = new HubSpot_Contacts({api: this.api});
		this.deals = new HubSpot_Deals({api: this.api});
		this.products = new HubSpot_Products({api: this.api});
	}

}