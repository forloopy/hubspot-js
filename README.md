# @forloopy/hubspot

**@forloopy/hubspot** is an open-source and free-to-use NodeJS library for interacting with the HubSpot API. Built as a lightweight and developer-friendly solution, it fully supports ES Modules (ESM) and offers advanced functionality, including an exclusive **auto-tagging feature** not available in the official SDK. This feature enables the automatic creation and assignment of tags to contacts, streamlining workflows for developers.

---

## Features

- Lightweight and intuitive integration with the HubSpot API.
- Exclusive **auto-tagging** functionality:
  - Automatically create tags.
  - Assign tags to contacts seamlessly.
- Fully supports ES Modules (ESM).
- Written in loose TypeScript for flexibility.
- Open source and completely free.

---

## Installation

Install the package using npm:

```bash
npm install @forloopy/hubspot
```

## Usage

Import & Initialise

```javascript
// Import
import HubSpot from '@forloopy/hubspot';

// Initialise
const hubspot = new HubSpot({
	accessToken: '<HUBSPOT_ACCESS_TOKEN>'
});
```

Create Contact

```javascript
const createdContact = await hubspot.contacts.create({
	properties: {
		firstname: '<FIRSTNAME>',
		lastname: '<LASTNAME>',
		email: '<EMAIL>'
	}
});
// Debug
console.log(createdContact)
```

Get Contact

```javascript
const contact = await hubspot.contacts.get('<CONTACT_ID>',{});
// Debug
console.log(contact)
```

List Contacts

```javascript
const contacts = await hubspot.contacts.getList({});
// Debug
console.log(contacts)
```


Add Auto-Tag(s) to Contact

```javascript
// Get contact (really, just setting the :id, as :objData is false)
const contact = await hubspot.contacts.get(contactId, { objData: false });
// Submit value(s) to existing named tags (the values will be created automatically)
const addAutoTags = await contact.addAutoTags({
	my_custom_tags_1: ['<VALUE_1>','<VALUE_2>','<VALUE_3>'],
	my_custom_tags_2: ['<VALUE_1>','<VALUE_2>','<VALUE_3>'],
});
// Debug
console.log(addAutoTags);
```

Remove Auto-Tag(s) from Contact

```javascript
// Get contact (really, just setting the :id, as :objData is false)
const contact = await hubspot.contacts.get(contactId, { objData: false });
// Submit value(s) to existing named tags (the values will be created automatically)
const removeAutoTags = await contact.removeAutoTags({
	my_custom_tags_1: ['<VALUE_1>'],
	my_custom_tags_2: ['<VALUE_2>','<VALUE_3>'],
});
// Debug
console.log(removeAutoTags);
```

## Configuration

Coming soon...

## Documentation

Coming soon...

## Contributing

At this time, this project isn't accepting contributions.