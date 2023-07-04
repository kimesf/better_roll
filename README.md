# Better Roll

> ### A simple D&D character sheet designed for mobile as a databaseless web application

Live on [better-roll.vercel.app](better-roll.vercel.app)

## Why?

I wanted to create a simple, straight forward and free character sheet solution for my D&D games.

I didn't mind it to be low automation. There would be no backend, user authentication or anything else. It's like the goal was to have a paper character sheet on my phone. I would do my best for it to be intuitive and ergonomic in use.

I would learn Svelte along the way.

## Remember to save your characters

***A `json` file with all your characters can be downloaded at `menu > characters > save`***

This application does not have a database. It relies on your browser [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to persist data. That means you could lose your characters data forever if your browser cache gets cleaned. It also means your characters are reserved to the device they were created.

Having the `json` save file allows you to:

- Restore your characters if your browser cache is cleaned up.
- Restore your characters to a previous state.
- Move your characters between different devices.

## Local Server

### Prerequisites

- Node.js 20.2.0

[:link: Install with asdf](https://github.com/asdf-vm/asdf-nodejs)

Clone.

```shell
git clone git@github.com:kimesf/better_roll.git
```

Open.

```shell
cd better_roll
```

Install dependencies.

```shell
npm install
```

Run development server.

```shell
npm run dev
```

Open [localhost:5173](localhost:5173) in your browser.

## TODO: Improvements

### TODO: UX and Features

- TODO: Ordering lists
- TODO: Adding spells
- TODO: Possible actions list
- TODO: Having current available spells in one place (different views for spells)

### TODO: Tech

- TODO: Tests.
- Better handling of character update logic. I would prefer character components not to be responsable for the update logic of the current select character.
- TODO: SSR needed? Cache whole app for when there is no internet. It's not needed anyway.

---

## Any questions or suggestions?

Open an issue and I`ll happily respond :smiley:
