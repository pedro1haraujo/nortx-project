import * as React from "react";
import { useState } from "react";
import httpErrorHandler from "../helpers/http-error-handler";
import api from "../http/api";

export function useDashboard() {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  return {
    isFetching,
    isLoadingMore,
    fetchDashboard(dateToFilter = null) {
      return new Promise(async (resolve, reject) => {
        setIsFetching(true)

        const url = `/dashboard?${dateToFilter? `date=${dateToFilter}`: ''}`;
        await api.get(url).then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível carregar os compromissos. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsFetching(false)
        })
      })
    },
    loadMoreCompromissos(pagina, dateToFilter) {
      return new Promise(async (resolve, reject) => {
        if (isFetching || isLoadingMore) {
          return;
        }
        setIsLoadingMore(true)

        const url = `/dashboard?pagina=${pagina}${dateToFilter? `&date=${dateToFilter}`: ''}`;
        await api.get(url).then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível carregar mais compromissos. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsLoadingMore(false)
        })
      })
    },
    updateCompromisso(compromissoId, status) {
      return new Promise(async (resolve, reject) => {
        if (isFetching || isLoadingMore) {
          return;
        }
        await api.put(`/dashboard/${compromissoId}`, { status }).then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível atualizar o compromisso. Tente novamente mais tarde.'))
        })
      })
    },
  };
}
