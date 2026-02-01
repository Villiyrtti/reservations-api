## Mitä tekoäly teki hyvin?
Tekoäly loi promptin mukaisen rajapinnan, joka täytti perusvaatimukset. APIsta löytyi poikkeuksien varalta varten tarvittavia virheiden käsittelyjä ja try-catch statementteja. Projektin rakenne oli suoraviivainen ja promptin mukaisesti logiikkaa oli jaettu useammalle tasolle.

Virhetilanteen kohdalla (Prompti 3) tekoälyn ehdottama korjaus oli toimiva.

Yleisesti ottean tekoälyn luoma rajapinta oli hyvä aloitus ja tästä pystyi laajentamaan logiikkaa ja rajapinnan rakennetta pidemmälle.

## Mitä tekoäly teki huonosti?
Tekoälyllä on tapana mennä toimivien käyttäjäpolkujen ('happy path') mukaisesti ja näin jättää huomiotta mahdollisia bugeja ja rajatapauksia.


Esimerkkejä tekoälyn luomassa rajapinnasta:
* POST / reservations kutsua tehdessä 'startDate': 'testipäivä' meni läpi ja tietokantaan tallentui varaus, jonka arvo oli undefined
* POST / reservations kutsua tehdessä tyhjiä arvoja ei tarkisteta, joten 'startDate': null meni läpi
* POST / reservations kutsua tehdessä ei tarkisteta onko käyttäjä tai huone olemassa
* Uudet objektit luotiin niin, että mitkä tahansa key-value parit liitettiin mukaan uuteen objektiin

Tottakai tässä voi miettiä, että kyseiset arvot tarkistettaisiin frontendin puolella ja oikeellisten arvojen tarkistus ei kuuluisi rajapinnan tehtäväksi. Itse koen, että tietyt arvojen tarkistukset on hyvä olla myös rajapinnan puolella.
Lisäksi tekoäly määritteli uuden IDn tulevan kutsusta, kun luotiin uusia varauksia, huoneita tai käyttäjiä. Tämä voi olla toimiva, mutta mahdollistaa tilateet, missä rajapinta sisältää useita erilaisia ID tunnuksia.

## Mitkä olivat tärkeimmät parannukset, jotka teit tekoälyn tuottamaan koodiin ja miksi?

* Päivämäärien validointi sekä tiettyjen propertien validointi, jotka tallentuvat suoraan tietokantaan kuten uuden varauksen otsikko. Tällä tavalla tietokanta pysyy loogisena ja odotettavasti esimerkiksi varauksen otsikko on aina tyypiltään string. Päivämäärien kohdalla tietokantaan ei tallennu null arvoja, joten tietokannan päivämääriin voi luottaa.
* Yksilöllisen IDn luominen tapahtuu rajapinnassa, eikä front endin puolella. Näin rajapinnalla on mahdollisuus valita, millaisia ID tunnuksia luodaan ja ID tunnukset ovat samankaltaisia.
* Varauksen muokkaus. Näen, että käyttäjällä voi tulla tarvetta muuttaa varausta ja suora muokkaus on suoraviivaisempi tapa kuin poistaa olemassaoleva varaus ja luoda uusi varaus.
* Varauksien hakeminen päivämäärien mukaan. Tämä auttaa esimerkiksi silloin, kun haluamme näyttää käyttäjille esimerkiksi kuluneen viikon aikaa tapahtuvat tai tapahtuneet varaukset.