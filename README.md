# Tableau Chrome Extension

![Infotopics Apps for Tableau](https://appsfortableau.infotopics.com/wp-content/uploads/2020/10/Infotopics-Apps-for-Tableau-logo-275x100-1.svg)

This Tableau Chrome Extension allows users to easily embed Tableau visualizations on any web page and resize the panes to fit their desired size. It provides a seamless integration with Tableau, giving users the flexibility to customize their viewing experience.

## Features

- Embed Tableau visualizations on any web page
- Resize panes to fit preferred dimensions
- Enhance viewing experience of Tableau dashboards

## Prerequisites

Before getting started, ensure you have the following installed on your system:

- [Google Chrome](https://www.google.com/chrome/)
- [Node.js](https://nodejs.org/en/) (version 12 or above)
- [Yarn](https://yarnpkg.com/) (package manager)

## Local Development

To run the development server and start working on the Tableau Chrome Extension locally, follow these steps:

1. Clone this repository to your local machine:

```shell
git clone https://github.com/your-username/tableau-chrome-extension.git
```

2. Navigate to the project directory:

```shell
cd tableau-chrome-extension
```

3. Install the project dependencies:

```shell
yarn install
```

4. Start the development server:

```shell
yarn dev
```

This will launch a local development server that you can access in your Chrome browser.

## Building the Extension

To build the Vue application and generate the necessary files for the extension, use the following command:

```shell
yarn build
```

This will create the built files in the `dist/` directory.

## Loading the Extension in Chrome

To add the Tableau Chrome Extension to your Chrome browser locally, follow these steps:

1. Open Google Chrome.
2. Visit `chrome://extensions` in the address bar.
3. Toggle on the "Developer mode" (usually located in the top-right corner).
4. Click the "Load unpacked" button.
5. Navigate to the `dist/` directory in the cloned repository.
6. Select the folder and click "OK".

The Tableau Chrome Extension should now be added to your Chrome browser. You can access it from the browser toolbar and start embedding and resizing Tableau visualizations on any web page.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute this code as per the terms of the license.

---

For more information and support, please contact [Infotopics Apps for Tableau](https://www.infotopics.nl/).
