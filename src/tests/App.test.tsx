import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest'
import App from '../App';
import MOCK_RESPONSE from './mock';
import News from '../Components/News';

describe('Testes do componente App', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue(MOCK_RESPONSE)
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Deve conter todos os elementos', async () => {
    render(<App />);
    const logoImage = screen.getByAltText(/trybe logo/i);
    const title = screen.getByText(/trybe news/i);
    await waitFor(() => {
      const firstNews = document.querySelector('#infoFirstNews');
      const recentButton = screen.getByRole('button', { name: /mais recentes/i });
      const favoriteButton = screen.getByRole('button', { name: /favoritas/i });
      const cards = document.querySelectorAll('.cards');

      expect(firstNews).toBeInTheDocument();
      expect(recentButton).toBeInTheDocument();
      expect(favoriteButton).toBeInTheDocument();
      expect(cards.length).toBe(8);
    });
    expect(logoImage).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  it('Deve carregar mais 9 ao clicar em Mais Notícias', async () => {
    render(<App />);
    await waitFor(() => {
      const btn = screen.getByText(/mais recentes/i);
      fireEvent.click(btn);
    });
  
    await waitFor(() => {
      const cards = document.querySelectorAll('.cards');
      expect(cards.length).toBe(8);
    });
  });
  it("Renderiza a mensagem quando favoriteNews está vazio e não a renderiza ao ter alguma favoriteNews", async () => {
    render(<App />);
    
    await waitFor(() => {
      const btn = screen.getByText(/favoritas/i);
      fireEvent.click(btn);
      const message = screen.getByText(/você ainda não tem notícias favoritas/i);
      expect(message).toBeInTheDocument();
      const firstNews = document.querySelector('#infoFirstNews');
      if (firstNews) {
        const heart = firstNews.querySelector('.favoriteButton');
        if (heart) {
          fireEvent.click(heart);
          expect(message).not.toBeInTheDocument();
        }
      }
    });
    
  });
  it("Ao clicar no botão de favoritar ele é alterado", async () => {
    render(<App />);
    await waitFor(() => {
      const btn = screen.getByText(/mais recentes/i);
      fireEvent.click(btn);
      const cards = document.querySelectorAll('.cards');
      const heart = cards[0].querySelector('.favoriteButton');
      expect(heart).toBeInTheDocument();
      if (heart && heart.hasAttribute('alt')) {
        const altValue = heart.getAttribute('alt');
        expect(altValue).toBe('Não Favoritado'); 
        fireEvent.click(heart);
        expect(altValue).toBe('Favoritado');
      }
    });
  });
});
