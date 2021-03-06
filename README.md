# Dastkari Dashboard

![1 copy 2x](https://user-images.githubusercontent.com/5421321/47799917-8afd7a00-dd2b-11e8-88c7-63588e25bcea.png)

A GraphQL-powered, single-page dashboard application for [Dastkari](https://github.com/mirumee/dastkari/).

## Demo

See the [public demo](https://pwa.dastkari.io/dashboard/) of Dastkari Dashboard!

Or launch the demo on a free Heroku instance.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 10.0+
- A running instance of [Dastkari](https://github.com/mirumee/dastkari/).

### Installing

Clone the repository:

```
$ git clone https://github.com/mirumee/dastkari-dashboard.git
```

Enter the project directory:

```
$ cd dastkari-dashboard
```

#### Using stable release

To use the official stable release, checkout to a release tag:

```
$ git checkout 2.10.1
```

See the list of all releases here: https://github.com/mirumee/dastkari-dashboard/releases/

#### Using development version

If you want to use the latest development version, checkout to the `master` branch:

```
$ git checkout master
```

Install NPM dependencies:

```
$ npm i
```

### Configuration

There are two environment variables available for configuration:

- `API_URI` (required) - URI of a running instance of Dastkari GraphQL API.
  If you are running Dastkari locally with the default settings, set `API_URI` to: `http://localhost:8000/graphql/`.

- `APP_MOUNT_URI` - URI at which the Dashboard app will be mounted.
  E.g. if you set `APP_MOUNT_URI` to `/dashboard/`, your app will be mounted at `http://localhost:9000/dashboard/`.

- `STATIC_URL` - URL where the static files are located.
  E.g. if you use S3 bucket, you should set it to the bucket's URL. By default Dastkari assumes you serve static files from the root of your site at `http://localhost:9000/`.

### Development

To start the development server run:

```
$ npm start
```

### Production

To build the application bundle run:

```
$ npm run build
```
