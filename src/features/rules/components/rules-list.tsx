import { ScrollView, StyleSheet } from "react-native";
import { Text } from "@/src/shared/components/ui";
import { useTranslation } from "react-i18next";
import { getResponsiveSize } from "@/src/util/size";

export const RulesList = () => {
  const { i18n } = useTranslation("rules");
  const locale = i18n.language;

  return (
    <ScrollView style={styles.rules} showsVerticalScrollIndicator={false}>
      {locale === "de" ? (
        <>
          <Text style={styles.rule}>
            <Text.Strong>1. Auswahl des Spielleiters: </Text.Strong>Zu Beginn
            des Spiels wählen alle Spieler einen Spielleiter aus. Sinnvoll: der
            Gastgeber übernimmt die Rolle.
          </Text>
          <Text style={styles.rule}>
            <Text.Strong>2. Aufteilung in Teams: </Text.Strong>Es kann
            Einzelspieler oder Teams geben. Die Teams sollten ungefähr das
            gleiche musikalische Wissen haben, die musikalischen Vorlieben
            sollten innerhalb der Teams breit gestreut sein. Das Team mit dem
            jüngsten Spieler beginnt.
          </Text>
          <Text style={styles.rule}>
            <Text.Strong>3. Spielvorbereitung: </Text.Strong>Der Spielleiter hat
            das Spiel "Music App!" vor sich und benötigt für das Abspielen
            der Songs mit Hilfe der QR- Codes die mobile App "Music App!"
            (zum Beispiel auf einem Handy).
            <Text.Br2 />
            Diese App hat zwei Funktionen: einen Zufallszahlengenerator zur
            Auswahl der Playcard und das Scannen der QR-Codes.
            <Text.Br2 />
            Im Spiel befinden sich 500 Playcards, auf denen jeweils 6 Fragen und
            Antworten unterschiedlicher Schwierigkeit stehen, sowie 150
            Chip-Points:
            <Text.Br2 />
            50 x 5 Points
            <Text.Br />
            50 x 10 Points
            <Text.Br />
            30 x 25 Points
            <Text.Br2 />
            sowie zum Tauschen 20 x 100 Points, a-, b- und c- Karten, eine
            Joker-Karte und der Buzzer.
          </Text>
          <Text style={styles.rule}>
            <Text.Strong>4. Spielablauf: </Text.Strong>
            Der Spielleiter startet den Zufallszahlengenerator in der App "Music App", zieht die Playcard mit der entsprechenden Nummer und
            scannt den QR-Code. Auf Spotify wird der Song angespielt und der
            Spielleiter stellt die Fragen.
            <Text.Br2 />
            Jetzt kann ein Team, das eigentlich nicht an der Reihe ist, seinen
            Joker setzen, um die gesamte Playcard mit 6 Fragen und 6 Antworten
            zu spielen. Es darf dabei ab Frage 3 die Antwortmöglichkeiten a), b)
            und c) nutzen. Bei einer falschen Antwort verliert das Team aber die
            gesamte Punktzahl der Karte an das Team, welches eigentlich hätte
            spielen können.
            <Text.Br2 />
            Wird kein Joker gezogen, beginnt das erste Team die Fragen zu
            beantworten.
            <Text.Br2 />
            Für jede richtige Antwort erhält das Team Punkte in Form von
            Playchips.
            <Text.Br2 />
            Die ersten drei Fragen lauten immer gleich: Titel, Interpret,
            Jahrzehnt der Veröffentlichung. Ab Frage 3 gibt es drei
            Antwortmöglichkeiten (a, b oder c).
            <Text.Br2 />
            Gibt das erste Team eine falsche Antwort oder kann eine Frage nicht
            beantworten, können die anderen Mitspieler den Buzzer drücken und
            versuchen, die Frage zu beantworten. Für eine richtige Antwort
            erhält das Team die entsprechenden Punkte. Bei einer falschen
            Antwort muss das Team die Punkte an das spielende Team abgeben.
            <Text.Br2 />
            Wenn ein Team eine Frage auf Anhieb - ohne Verwendung der
            Antwortmöglichkeiten - beantwortet, erhält es die doppelte
            Punktzahl.
            <Text.Br2 />
            Das Team, das dran ist, erhält Punkte für richtige Antworten und
            verliert nur dann Punkte, wenn es die Antwortmöglichkeiten a, b und
            c nutzen möchte und dann die Frage falsch beantwortet. Die Punkte
            der Frage erhält dann der Spielleiter.
            <Text.Br2 />
            Liest der Spielleiter die Antwortmöglichkeiten vor, können aber
            zunächst alle Teams eine Antwortkarte a, b oder c verdeckt legen, um
            im Fall einer falschen Antwort des spielenden Teams die richtige
            Antwort zu drehen und Punkte zu erhalten.
            <Text.Br2 />
            Danach geht es beim Spiel weiter mit dem Team, das an der Reihe war.
            <Text.Br2 />
            Sind alle Fragen der ersten Playcard beantwortet, ist das nächste
            Team mit einer neuen Playcard an der Reihe.
            <Text.Br2 />
            Die Teams entscheiden selbst über die Dauer der Musikparty.
          </Text>
          <Text style={styles.rule}>
            <Text.Strong>5. Sieg: </Text.Strong>
            Das Team mit den meisten Punkten gewinnt.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.rule}>
            <Text.Strong>1. Selection of the Game Master: </Text.Strong>At the
            beginning of the game, all players choose a game master. It makes
            sense for the host to take on the role.
          </Text>
          <Text style={styles.rule}>
            <Text.Strong>2. Division into Teams: </Text.Strong>There can be
            individual players or teams. The teams should have roughly the same
            level of musical knowledge, and musical preferences should be
            diverse within the teams. The team with the youngest player starts.
          </Text>
          <Text style={styles.rule}>
            <Text.Strong>3. Game Preparation: </Text.Strong>The game master has
            the game "Music App!" in front of them and needs the mobile app
            "Music App!" (for example, on a phone) to play the songs using
            the QR codes.
            <Text.Br2 />
            This app has two functions: a random number generator to select the
            playcard and scanning the QR codes.
            <Text.Br2 />
            The game includes 500 playcards, each with 6 questions and answers
            of varying difficulty, and 150 chip-points:
            <Text.Br2 />
            50 x 5 Points
            <Text.Br />
            50 x 10 Points
            <Text.Br />
            30 x 25 Points
            <Text.Br2 />
            and for trading 20 x 100 Points, a-, b-, and c- cards, a joker card,
            and the buzzer.
          </Text>
          <Text style={styles.rule}>
            <Text.Strong>4. Gameplay: </Text.Strong>
            The game master starts the random number generator in the app "Music App", draws the playcard with the corresponding number, and
            scans the QR code. The song will be played on Spotify and the game
            master will ask the questions.
            <Text.Br2 />
            Now, a team that is not actually in turn can use their joker to play
            the entire playcard with 6 questions and 6 answers. From question 3
            onwards, they can use the answer choices a), b), and c). However, if
            they answer incorrectly, the team loses the entire score of the card
            to the team that was supposed to play.
            <Text.Br2 />
            If no joker is used, the first team begins to answer the questions.
            <Text.Br2 />
            For each correct answer, the team receives points in the form of
            playchips.
            <Text.Br2 />
            The first three questions are always the same: title, artist, decade
            of release. From question 3 onwards, there are three answer choices
            (a, b, or c).
            <Text.Br2 />
            If the first team gives a wrong answer or cannot answer a question,
            other players can press the buzzer and try to answer the question.
            For a correct answer, the team receives the corresponding points.
            For a wrong answer, the team must give the points to the playing
            team.
            <Text.Br2 />
            If a team answers a question immediately-without using the answer
            choices—it receives double points.
            <Text.Br2 />
            The team in turn receives points for correct answers and only loses
            points if they choose to use the answer choices a, b, and c and then
            answer the question incorrectly. The points of the question then go
            to the game master.
            <Text.Br2 />
            If the game master reads the answer choices, all teams can first
            place an answer card a, b, or c face down to reveal the correct
            answer and earn points in case of an incorrect answer by the playing
            team.
            <Text.Br2 />
            The game continues with the team that was in turn.
            <Text.Br2 />
            Once all questions of the first playcard are answered, the next team
            takes a new playcard.
            <Text.Br2 />
            The teams decide for themselves the duration of the music party.
          </Text>
          <Text style={styles.rule}>
            <Text.Strong>5. Victory: </Text.Strong>
            The team with the most points wins.
          </Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rules: {
    paddingHorizontal: getResponsiveSize(8),
  },
  rule: {
    textAlign: "left",
    marginBottom: getResponsiveSize(16),
  },
});
