// 7thsea.js

// Importa le classi standard di Foundry
import { registerSettings } from './settings.js'; 
import { SeventhSeaActorSheet } from './sheets/SeventhSeaActorSheet.js';

/**
 * Funzione eseguita quando Foundry è completamente inizializzato.
 */
Hooks.once('init', async function() {
    console.log('7thsea | Inizializzazione del sistema 7th Sea.');

    // ----------------------------------------------------
    // 1. Registra le impostazioni di sistema
    // ----------------------------------------------------
    // registerSettings(); 
    // ^ Dovrai creare un file settings.js se necessario.

    // ----------------------------------------------------
    // 2. Registra i fogli personaggio personalizzati
    // ----------------------------------------------------
    
    // Per Personaggi Giocanti (PG)
    Actors.registerSheet("7thsea", SeventhSeaActorSheet, { 
        types: ["character"], 
        makeDefault: true, 
        label: "7thsea.SheetClassLabelCharacter" 
    });

    // Per PNG (Non Giocanti)
    // Actors.registerSheet("7thsea", SeventhSeaNPCSheet, { types: ["npc"], label: "7thsea.SheetClassLabelNPC" });
    // ^ Dovrai creare una classe e un template HTML per l'NPC.

    // ----------------------------------------------------
    // 3. Registra il lancio di dadi personalizzato (7th Sea usa "Briscole" e "Eroi")
    // ----------------------------------------------------
    
    // Non c'è codice per il tiro di dadi qui, ma la logica del tiro
    // sarà il prossimo passo cruciale (dovrai estendere la classe Actor).
});

// =========================================================================
// CLASSI DEI FOGLI PERSONAGGIO
// (In un progetto reale, sposteresti questo in una sottocartella 'sheets')
// =========================================================================

/**
 * Foglio personaggio di base.
 * Sostituisce la classe standard ActorSheet
 */
export class SeventhSeaActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["7thsea", "sheet", "actor"],
            template: "systems/7thsea/templates/actor-sheet.html",
            width: 600,
            height: 600
        });
    }

    /** @override */
    getData() {
        // Recupera i dati di base dal Documento Actor
        const context = super.getData();

        // Aggiungi dati specifici del sistema per un facile accesso nel template HTML
        context.systemData = context.data.system;

        return context;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Aggiungi qui i listener per i tuoi pulsanti di lancio dei dadi.
        // Esempio: ascoltare i click sul pulsante "Brawl"
        /*
        html.find('.roll-brawl').click(ev => {
            const attributeValue = this.actor.system.attributes.brawling.value;
            // Qui andrà la logica del tiro di dadi 7th Sea
            console.log(`Eseguo il tiro Mischia con valore: ${attributeValue}`);
        });
        */
    }
}