# Minitab Assignment

## Install and Run project
First, clone the project and ensure current branch is the latest version of main. Second, navigate to project root and run `npm ci`. This clears any previous installations of node modules and forces a fresh install. Third, run `npm start` to run on localhost

## Assumptions and Quality of Life changes
Assumption 1: The table is static and changes to the form require a new generation of the table

QoL Change 1: Error generation was to be on table generation attempts but as a user I would like to know immediately that I cannot generate a table. Therefore the button is disabled with a generic error message until all inputs are valid.