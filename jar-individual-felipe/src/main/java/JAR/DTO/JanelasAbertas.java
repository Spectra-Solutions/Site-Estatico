package JAR.DTO;

import JAR.DAO.JanelasAbertasDao;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.janelas.Janela;

import java.util.ArrayList;
import java.util.List;

public class JanelasAbertas {

    private List <Janela> janelas;
    private List <String> janelasProibidas;
    private Integer idMaquina;


    public JanelasAbertas() {
        Maquina maquina = new Maquina();
        this.janelas = new ArrayList<>();
        this.idMaquina = maquina.getIdMaquina();
        this.janelasProibidas = null;
    }

    public List<Janela> getJanelas(){
        Looca looca = new Looca();
        janelas = looca.getGrupoDeJanelas().getJanelasVisiveis();
        return janelas;
    }

    public void verificarJanelas(){
        JanelasAbertasDao janelasAbertasDao = new JanelasAbertasDao();
        janelasProibidas = janelasAbertasDao.getJanelasProibidas(2);
        List <Janela> janelas = getJanelas();
        for (Janela janela : janelas) {
            String janelaDaVez = janela.getTitulo();
            for (String janelaProibida :janelasProibidas) {
                if (janelaDaVez.contains(janelaProibida)){
                    System.out.println("""
                            Janela proibida está aberta
                            Nome: %s""".formatted(janelaDaVez));
                    janelasAbertasDao.registrarInfracao(2, janelaDaVez);
                }
            }
        }
    }
}
