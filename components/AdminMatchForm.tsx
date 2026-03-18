"use client";

import { useMemo, useState } from "react";
import type { Player } from "../types/player";

type AdminMatchFormProps = {
  players: Player[];
  action: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  initialValues?: {
    match_id?: number;
    player_1_id?: number;
    player_2_id?: number;
    winner_id?: number;
    score_text?: string;
    match_date?: string;
    super_tiebreak?: boolean;
  };
};

export default function AdminMatchForm({
  players,
  action,
  submitLabel = "Guardar partido",
  initialValues,
}: AdminMatchFormProps) {
  const [player1Id, setPlayer1Id] = useState(
    initialValues?.player_1_id ? String(initialValues.player_1_id) : ""
  );
  const [player2Id, setPlayer2Id] = useState(
    initialValues?.player_2_id ? String(initialValues.player_2_id) : ""
  );
  const [winnerId, setWinnerId] = useState(
    initialValues?.winner_id ? String(initialValues.winner_id) : ""
  );

  const availablePlayer2Options = useMemo(() => {
    return players.filter((player) => String(player.id) !== player1Id);
  }, [players, player1Id]);

  const winnerOptions = useMemo(() => {
    return players.filter(
      (player) =>
        String(player.id) === player1Id || String(player.id) === player2Id
    );
  }, [players, player1Id, player2Id]);

  return (
    <form action={action} className="mt-6 grid gap-4">
      {initialValues?.match_id ? (
        <input type="hidden" name="match_id" value={initialValues.match_id} />
      ) : null}

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">
          Jugador 1
        </label>
        <select
          name="player_1_id"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          required
          value={player1Id}
          onChange={(e) => {
            const nextValue = e.target.value;
            setPlayer1Id(nextValue);

            if (nextValue === player2Id) {
              setPlayer2Id("");
            }

            if (winnerId && winnerId !== nextValue && winnerId !== player2Id) {
              setWinnerId("");
            }
          }}
        >
          <option value="" disabled>
            Seleccione un jugador
          </option>
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">
          Jugador 2
        </label>
        <select
          name="player_2_id"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          required
          value={player2Id}
          onChange={(e) => {
            const nextValue = e.target.value;
            setPlayer2Id(nextValue);

            if (winnerId && winnerId !== player1Id && winnerId !== nextValue) {
              setWinnerId("");
            }
          }}
        >
          <option value="" disabled>
            Seleccione un jugador
          </option>
          {availablePlayer2Options.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">
          Ganador
        </label>
        <select
          name="winner_id"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          required
          value={winnerId}
          onChange={(e) => setWinnerId(e.target.value)}
          disabled={!player1Id || !player2Id || player1Id === player2Id}
        >
          <option value="" disabled>
            {!player1Id || !player2Id
              ? "Seleccione primero ambos jugadores"
              : player1Id === player2Id
              ? "Los jugadores deben ser distintos"
              : "Seleccione el ganador"}
          </option>

          {winnerOptions.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">
          Marcador
        </label>
        <input
          name="score_text"
          type="text"
          placeholder="Ej: 6-4 4-6 10-8"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          required
          defaultValue={initialValues?.score_text ?? ""}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">
          Fecha del partido
        </label>
        <input
          name="match_date"
          type="date"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          required
          defaultValue={initialValues?.match_date ?? ""}
        />
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
        <input
          name="super_tiebreak"
          type="checkbox"
          id="super_tiebreak"
          defaultChecked={initialValues?.super_tiebreak ?? false}
        />
        <label htmlFor="super_tiebreak" className="text-sm font-semibold">
          El perdedor cayó en super tie break
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 rounded-2xl bg-gradient-to-r from-orange-400 via-yellow-400 to-cyan-400 px-6 py-3 text-sm font-black text-slate-950 shadow transition hover:scale-[1.01]"
      >
        {submitLabel}
      </button>
    </form>
  );
}