import React from "react";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
  return (
    <div>
      <Helmet>
        <meta name="keywords" content="404" />
        <meta name="description" content="404" />
        <title>404</title>
      </Helmet>

      <h1>404 - Страница не найдена</h1>
    </div>
  );
};

export default NotFoundPage;
