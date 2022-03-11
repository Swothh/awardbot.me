import Link from 'next/link';

export default function Tos({ $ }) {
  const titleClasses = "mt-4 text-white font-bold text-3xl";
  const textClasses = "mt-1 text-white/50 font-medium text-lg";
  const listClasses = "mt-1 text-white/50 font-medium text-base ml-10 mb-5 list-disc";
  return (
    <div>
      <p className="text-sm text-white/30 mb-1">Last Update: 01/01/2022</p>
      <h2 className={titleClasses}>1. Terms</h2>
      <a className={textClasses}>
        By accessing this Website, accessible from https://awardbot.me, you are
        agreeing to be bound by these Website Terms and Conditions of Use and
        agree that you are responsible for the agreement with any applicable
        local laws. If you disagree with any of these terms, you are prohibited
        from accessing this site. The materials contained in this Website are
        protected by copyright and trade mark law.
      </a>

      <h2 className={titleClasses}>2. Use License</h2>

      <a className={textClasses}>
        Permission is granted to temporarily download one copy of the materials
        on Award's Website for personal, non-commercial transitory viewing
        only. This is the grant of a license, not a transfer of title, and under
        this license you may not:
      </a>

      <ul className={listClasses}>
        <li>modify or copy the materials;</li>
        <li>
          use the materials for any commercial purpose or for any public
          display;
        </li>
        <li>
          attempt to reverse engineer any software contained on Award's
          Website;
        </li>
        <li>
          remove any copyright or other proprietary notations from the
          materials; or
        </li>
        <li>
          transferring the materials to another person or "mirror" the materials
          on any other server.
        </li>
      </ul>

      <h2 className={titleClasses}>3. Disclaimer</h2>

      <a className={textClasses}>
        All the materials on Award’s Website are provided "as is". Award makes
        no warranties, may it be expressed or implied, therefore negates all
        other warranties. Furthermore, Award does not make any representations
        concerning the accuracy or reliability of the use of the materials on
        its Website or otherwise relating to such materials or any sites linked
        to this Website. Features for which Award does not accept responsibility:
        <ul className={listClasses}>
          <li>invitation created thanks to join_server feature;</li>
          <li>messages sent by the bot to the channel;</li>
          <li>user/channel/category tags thrown by the bot;</li>
        </ul>
      </a>

      <h2 className={titleClasses}>4. Limitations</h2>

      <a className={textClasses}>
        Award or its suppliers will not be hold accountable for any damages
        that will arise with the use or inability to use the materials on
        Award’s Website, even if Award or an authorize representative of this
        Website has been notified, orally or written, of the possibility of such
        damage. Some jurisdiction does not allow limitations on implied
        warranties or limitations of liability for incidental damages, these
        limitations may not apply to you. 
      </a>


      <h2 className={titleClasses}>5. Revisions and Errata</h2>

      <a className={textClasses}>
        The materials appearing on Award’s Website may include technical,
        typographical, or photographic errors. Award will not promise that any
        of the materials in this Website are accurate, complete, or current.
        Award may change the materials contained on its Website at any time
        without notice. Award does not make any commitment to update the
        materials.
      </a>

      <h2 className={titleClasses}>6. Links</h2>

      <a className={textClasses}>
        Award has not reviewed all of the sites linked to its Website and is
        not responsible for the contents of any such linked site. The presence
        of any link does not imply endorsement by Award of the site. The use of
        any linked website is at the user’s own risk.
      </a>

      <h2 className={titleClasses}>7. Site Terms of Use Modifications</h2>

      <a className={textClasses}>
        Award may revise these Terms of Use for its Website at any time without
        prior notice. By using this Website, you are agreeing to be bound by the
        current version of these Terms and Conditions of Use.
      </a>

      <h2 className={titleClasses}>8. Your Privacy</h2>

      <a className={textClasses}>Please read our <Link href="/privacy"><span className="hover:text-blue-500 hover:underline transition-all duration-200 cursor-pointer">Privacy Policy</span></Link>.</a>

      <h2 className={titleClasses}>9. Governing Law</h2>

      <a className={textClasses}>
        Any claim related to Award's Website shall be governed by the laws of
        tr without regards to its conflict of law provisions.
      </a>
    </div>
  );
}
