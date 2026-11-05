import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BankCard } from "../types/bank";


export const bankApi = createApi({
    reducerPath: "bankApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    
    // 🏷️ ТАМОЖЕННЫЕ ТЕГИ: Это секретные маяки для автоматической перезагрузки экрана!
    tagTypes: ['Cards'],

    endpoints: (builder) => ({
        // 🛰️ 1. Труба на скачивание (Query)
        getCards: builder.query<BankCard[], void>({
            query: () => "/todos",
            providesTags: ['Cards'], // 📌 Маяк: "Эта труба следит за полкой Cards!"
        }),

        // 🚚 2. НАША НОВАЯ СИЛОВАЯ ТРУБА НА ОБНОВЛЕНИЕ БАЛАНСА (Mutation)
        updateBalance: builder.mutation<BankCard, { id: string; balance: number }>({
            query: ({ id, balance }) => ({
                url: `/todos/${id}`, // 🎯 Целимся строго в конкретную карту по её id!
                method: 'PATCH',      // 🛠️ Метод PATCH означает: "Частичное изменение данных на бэке"
                body: { balance },    // 📦 Сама посылка (новые цифры баланса), которую мы пихаем в файл db.json
            }),
            invalidatesTags: ['Cards'], // ⚡ ЯДЕРНЫЙ ВЗРЫВ КЭША: Команда "Метро, старые данные протухли, быстро качай новые!"
        }),
    })
});

// 🔌 Автоматически рождаем два шланга-хука: один для скачивания, второй для изменения!
export const { useGetCardsQuery, useUpdateBalanceMutation } = bankApi;