# FMT e.V. - Site vitrine multilingue

Site officiel de la Fondation Mefo Tuèbu, construit avec Next.js, TypeScript et `next-intl`.
Le projet est organisé en trois langues (`fr`, `en`, `de`) et permet de faire évoluer facilement les contenus du site.

## Objectif du projet

Ce dépôt contient le site vitrine public de la fondation.
L’essentiel du contenu textuel se trouve dans les fichiers de traduction :

- `messages/fr.json`
- `messages/en.json`
- `messages/de.json`

Si vous devez mettre à jour les textes visibles sur le site, c’est généralement dans ces fichiers qu’il faut intervenir.

## Technologies utilisées

- Next.js 16
- TypeScript
- Tailwind CSS
- `next-intl` pour les langues
- Supabase et PostgreSQL pour les futures fonctionnalités d’administration

## Prérequis

- Node.js 20 ou supérieur
- npm installé avec Node.js

## Installation

1. Ouvrez un terminal.
2. Clonez le projet :

```bash
git clone <url-du-depot>
```

3. Entrez dans le dossier du projet :

```bash
cd fmt-platform
```

4. Installez les dépendances :

```bash
npm install
```

## Démarrer le projet

Pour lancer le site en local :

```bash
npm run dev
```

Ensuite, ouvrez :

```bash
http://localhost:3000
```

Le site redirige automatiquement vers la langue par défaut.
Les versions localisées sont accessibles via :

- `http://localhost:3000/fr`
- `http://localhost:3000/en`
- `http://localhost:3000/de`

## Commandes utiles

- `npm run dev` : lance le serveur de développement
- `npm run build` : crée la version de production
- `npm run start` : démarre la version de production
- `npm run lint` : vérifie la qualité du code

## Où modifier le contenu

Le contenu éditorial du site est géré dans les fichiers suivants :

- `messages/fr.json`
- `messages/en.json`
- `messages/de.json`

Chaque fichier contient les textes de la même structure :

- `nav` pour la navigation
- `hero` pour la section d’accueil
- `about` pour la présentation
- `projects` pour les projets
- `news` pour l’actualité
- `events` pour les événements
- `partners` pour les partenaires
- `donate` pour la section de dons
- `footer` pour le pied de page

## Comment mettre les vrais contenus

Quand vous remplacez les textes par les contenus définitifs, gardez toujours la même structure de clés dans les trois langues.

Exemple :

```json
{
  "hero": {
    "headline": "Texte en français",
    "subheadline": "Description en français"
  }
}
```

Dans `en.json` et `de.json`, gardez exactement les mêmes clés :

```json
{
  "hero": {
    "headline": "English text",
    "subheadline": "English description"
  }
}
```

```json
{
  "hero": {
    "headline": "Deutscher Text",
    "subheadline": "Deutsche Beschreibung"
  }
}
```

### Règles à respecter

- Ne changez pas les noms des clés.
- Ajoutez une clé dans les trois fichiers en même temps.
- Conservez le même niveau de structure dans chaque langue.
- Vérifiez les accents, apostrophes et caractères spéciaux dans les textes finaux.

## Où changer la langue par défaut

La langue par défaut est définie dans :

- `i18n/config.ts`

Si vous souhaitez changer la langue par défaut du site, c’est ce fichier qu’il faut modifier.

## Structure du projet

- `app/` : pages et layouts Next.js
- `components/` : composants réutilisables de l’interface
- `messages/` : textes traduits
- `i18n/` : configuration des langues et du routage
- `lib/` : utilitaires et intégrations

## Notes importantes

- Le site utilise les Server Components par défaut.
- Tailwind CSS sert à la mise en page et au style.
- `fetch()` est privilégié pour les appels réseau.
- Le projet est préparé pour une future partie administration avec Supabase.

## Si vous voulez aller plus loin

1. Remplacer les textes provisoires par les contenus définitifs.
2. Vérifier la cohérence entre les trois langues.
3. Préparer les images, logos et liens de contact finaux.
4. Configurer les variables Supabase si la partie administration est activée.

