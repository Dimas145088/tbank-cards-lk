import type { BankCard } from "../types/bank"; // 🪄 Привезли паспорт карты на таможню импортов!
import { Currency } from "../const/bank.const";

// 🧬 Сбиваем b2b-ГОСТ для нашего кабеля-пропсов!
// Мы говорим: Папа обязан передать в этот кабель ровно одну готовую карту card!
interface CardBalanceProps {
    card: BankCard
}

// 🧱 Собираем сам Лего-кирпичик!
export function CardBalance({ card }: CardBalanceProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #2b2b2b, #111111)', // Суровый черный премиум Т-Банка
      color: '#fff',
      padding: '24px',
      borderRadius: '16px',
      width: '320px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      fontFamily: 'sans-serif',
      marginBottom: '15px'
    }}>
      <div style={{ fontSize: '14px', color: '#aaa', marginBottom: '8px' }}>Текущий баланс</div>
      
      {/* 🖥️ Печатаем живое мясо данных, которое притечёт по кабелю пропсов! */}
      <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        {card.balance.toLocaleString('ru-RU')} {Currency[card.currency as keyof typeof Currency] || card.currency}
      </div>

      <div style={{ fontSize: '16px', letterSpacing: '2px', color: '#eee' }}>
        {card.cardNumber} 
      </div>
    </div>
  );
}