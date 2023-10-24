package JAR.VIEW;

import JAR.DTO.JanelasAbertas;

public class SistemaSpectra {
    public static void main(String[] args) {
        IniciarSistema novoSistema = new IniciarSistema();
        JanelasAbertas janelasAbertas = new JanelasAbertas();
        novoSistema.validarLogin();
        janelasAbertas.verificarJanelas();
    }
}