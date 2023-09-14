import * as React from "react";
import { useState } from "react";
import httpErrorHandler from "../helpers/http-error-handler";
import api from "../http/api";

export function useLembretes() {
  const [isFetching, setIsFetching] = useState(false);

  return {
    isFetching,
    fetchLembretes() {
      return new Promise(async (resolve, reject) => {
        setIsFetching(true)

        await api.get('lembretes').then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível buscar os lembretes. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsFetching(false)
        })
      })
    },
  };
}
