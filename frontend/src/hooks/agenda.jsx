import * as React from "react";
import { useState } from "react";
import httpErrorHandler from "../helpers/http-error-handler";
import api from "../http/api";

export function useAgenda() {
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingEvento, setIsFetchingEvento] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return {
    isFetching,
    isFetchingEvento,
    isDeleting,
    isSaving,
    fetchAgenda() {
      return new Promise(async (resolve, reject) => {
        setIsFetching(true)

        await api.get('agendas').then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível buscar a agenda. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsFetching(false)
        })
      })
    },
    fetchEvento(eventoId) {
      return new Promise(async (resolve, reject) => {
        setIsFetchingEvento(true)

        await api.get(`agendas/${eventoId}`).then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível buscar o evento. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsFetchingEvento(false)
        })
      })
    },
    salvarEvento(evento) {
      return new Promise(async (resolve, reject) => {
        setIsSaving(true)

        await api.put(`agendas/${evento.id}`, { evento }).then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível salvar o evento. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsSaving(false)
        })
      })
    },
    deleteEvento(eventoId) {
      return new Promise(async (resolve, reject) => {
        setIsDeleting(true)

        await api.delete(`agendas/${eventoId}`).then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível excluir o evento. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsDeleting(false)
        })
      })
    },
  };
}
