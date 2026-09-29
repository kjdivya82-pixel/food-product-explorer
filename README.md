# Food Product Explorer

A responsive React application for browsing DummyJSON's food and grocery products. Search by title, narrow results by category, sort the collection, and open a detailed product view.

## Technologies

- React 19 and TypeScript
- Vite
- React Router
- Fetch API
- DummyJSON REST API
- CSS

## Features

- Food and grocery catalog with responsive cards and API product imagery
- Client-side title search and category filtering
- Sorting by recommended order, price, rating, and name
- Product detail pages with stock, brand, rating, and discount information
- Loading skeletons, retryable errors, and not-found handling
- Responsive navigation and an About page

## API Details

- `GET https://dummyjson.com/products?limit=0` loads the complete catalog.
- `GET https://dummyjson.com/products/{id}` loads one product for its detail page.

The browser calls DummyJSON directly. The UI keeps products in the `groceries` category and does not show other product categories. There is no backend service.

## Installation and Run

```sh
npm install
npm run dev
```

Create a production build and type-check the application:

```sh
npm run build
```

## Search and Filtering

The catalog is fetched once when the Products page loads. The displayed collection is restricted to DummyJSON's `groceries` category. Title search, category filtering, and sorting operate locally against that collection, so adjusting controls makes no additional API calls. The available category option is generated from the API response.

## Currency

Prices are converted from DummyJSON's USD-denominated values using a fixed approximate rate of INR 83 per USD, then formatted with the Indian rupee (INR) locale. This rate is for display only and is not updated live.

## Design and Architecture

The interface uses a warm light palette, restrained card treatments, product imagery, and responsive layouts. Shared UI lives in `src/components`, route-level views in `src/pages`, API access in `src/services`, and product fetching in `src/hooks`. Product, API response, sort, and page state are typed; no backend or unnecessary UI library is used.

## Project Structure

```text
src/
  components/   Shared header, footer, filters, cards, and states
  hooks/        Product catalog data hook
  pages/        Products, details, About, and not-found routes
  services/     DummyJSON fetch functions
  types/        Product and API response interfaces
  utils/        Formatting and product ID parsing helpers
  App.tsx       Routes and shared layout
  main.tsx      React entry point
```

## Known Limitations

- Product availability and images depend on the public DummyJSON service.
- Search and filters only include the records returned by the list endpoint.
- The USD-to-INR conversion uses an approximate fixed rate and is not financial or live exchange-rate data.

## Bonus Features

- Sorting by price, rating, and title
- Dynamic categories, stock labels, discount badges, product ID breadcrumb, and responsive mobile navigation