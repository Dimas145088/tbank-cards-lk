import { useGetCardsQuery, useUpdateBalanceMutation } from './api/bank.api';
import { CardBalance } from './components/CardBalance';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 🧙‍♂️ СТРОИМ ЖЕСТКУЮ ТАМОЖЕННУЮ СХЕМУ ДЛЯ НАШЕЙ ФОРМЫ!
const balanceSchema = z.object({
  // ⚡ Проверяем инпут с ярлыком 'newBalance'
  newBalance: z
    .string() // 1. Из RHF данные всегда летят строкой (буквами)
    .min(1, 'Поле не может быть пустым!') // 2. Запрещаем отправлять пустоту
    .refine((val) => !isNaN(Number(val)), 'Введите корректное число!') // 3. Защита от дурака (только цифры)
    .refine((val) => Number(val) >= 0, 'Баланс не может быть отрицательным!') // 4. Финтех-ГОСТ (баланс только от 0 и выше)
});

function App() {
  // 🗜️ 1. Забрали сундук и переклеили data на card!
  const { data: card, isLoading } = useGetCardsQuery();

  // 🚚 Забрали со склада АПИ силовой кабель мутации!
  // updateBalance — это функция-кнопка, которую мы будем вызывать, а { isLoading: isUpdating } — датчик того, что КамАЗ едет на бэк
  const [updateBalance, {isLoading: isUpdating}] = useUpdateBalanceMutation();

  // ⚡ Внедряем пульт управления инпутами RHF!
  // const {register, handleSubmit} = useForm();

    // 🔌 Подключили кабель-мост zodResolver и засунули в него нашу схему правил безопасности!
  // Дополнительно достали из сундука формы скрытую полку formState: { errors }, куда робот будет складывать тексты ошибок!
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(balanceSchema)
  });

  // 🏷️ Наш личный разгрузочный стол! Сюда RHF привезёт собранный мешок.
  const onSubmit = (data: any) => {
    // 🪄 Если курьер привёз пустой ящик карт с сервера, стопаем процесс
    if (!card || card.length === 0) return;

    // 🚀 Вызываем наш сетевой КамАЗ! Передаём id нашей ПЕРВОЙ карты и новый баланс, переведённый в ЧИСЛО!
    updateBalance({
      id: card[0].id,
      balance: Number(data.newBalance)
    });
  };




   // 🕵️‍♂️ ВНЕДРЯЕМ ЛАЗЕРНЫЕ ДАТЧИКИ НАБЛЮДЕНИЯ В КОНСОЛЬ!
  console.log('--- ОТЛАДКА ЦЕХА App ---');
  console.log('Идет ли загрузка (isLoading)?:', isLoading);
  console.log('Что привез курьер с сервера (card)?:', card);

  // 🛡️ 2. Пост охраны загрузки (СТРОГО НА ОДНОЙ СТРОКЕ, БЕЗ РАЗРЫВОВ!)
  if (isLoading) return <div style={{ fontSize: '24px', padding: '40px', fontFamily: 'sans-serif' }}>Загрузка b2b-данных банка...</div>;

  return (
    <div style={{ padding: '40px', background: '#f5f5f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Личный Кабинет Т-Банка</h1>
      
      {/* 🔌 ЗАМЫКАЕМ ЦЕПЬ В ФИГУРНЫХ СКОБКАХ! */}
      {card && <CardBalance card={card[0]} />}

        {/* 📋 НАША НОВАЯ ФОРМА УПРАВЛЕНИЯ БАЛАНСОМ ПОД КОНТРОЛЕМ RHF */}
      <form onSubmit={handleSubmit(onSubmit)}  style={{ marginTop: '30px', background: '#fff', padding: '24px', borderRadius: '12px', width: '320px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 16px 0', fontFamily: 'sans-serif', color: '#111' }}>Изменить баланс карты</h3>
        
        {/* 🔌 НАШ ПЕРВЫЙ ЖИВОЙ ИНПУТ, ОБМОТАННЫЙ ПРОВОДОМ REGISTER! */}
        <input 
          type="number" 
          placeholder="Введите новый баланс"
          {...register('newBalance')} 
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', marginBottom: '16px', fontSize: '16px' }}
        />
        
         {/* 🚨 АВАРИЙНОЕ ТАБЛО ОШИБОК: Если Zod найдёт брак, здесь вспыхнет красный текст! */}
        {errors.newBalance && (
          <p style={{ color: '#e53935', fontSize: '14px', margin: '-8px 0 16px 0', fontFamily: 'sans-serif', fontWeight: '500' }}>
            {errors.newBalance.message}
          </p>
        )}

        {/* 🚀 КНОПКА ПУСКА СИСТЕМЫ */}
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#ffdd2d', color: '#111', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          Сохранить на сервере
        </button>
      </form>
      
    </div>
  );
}

export default App;
